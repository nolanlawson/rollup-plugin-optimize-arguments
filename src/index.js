import { walk } from 'estree-walker'
import { parse } from 'acorn'
import MagicString from 'magic-string'

const INSERTION = 'var $_len = arguments.length, $_args = new Array($_len); ' +
  'while ($_len--) { $_args[$_len] = arguments[$_len]; }'

// only certain situations can we avoid cloning arguments:
// - binary, e.g. i < foo.length
// - variable declaration, e.g. var foo = arguments.length
// - return statements, e.g. return arguments.length
// - calling on that property, e.g. callIt(arguments.length) (but not e.g.
//   arguments.pop()
function validMemberParentToAvoidCloning (node, parent) {
  if (parent.type === 'VariableDeclarator' ||
      parent.type === 'BinaryExpression' ||
      parent.type === 'ReturnStatement') {
    return true
  }
  if (parent.type === 'CallExpression') {
    return ~parent.arguments.indexOf(node)
  }
  return false
}

function tryParse (code, id) {
  try {
    return parse(code, {
      ecmaVersion: 6,
      sourceType: 'module'
    })
  } catch (err) {
    console.warn(`rollup-plugin-optimize-arguments: failed to parse ${id}. 
    Consider restricting the plugin to particular files via options.include`)
  }
}

function isFunction (node) {
  switch (node.type) {
    case 'FunctionDeclaration':
    case 'FunctionExpression':
      return true
  }
  return false
}

function isArrowFunction (node) {
  return node.type === 'ArrowFunctionExpression'
}

function getLeadingWhitespace (str) {
  return str.match(/\s*/)[0]
}

function optimizeArguments (options) {
  options = options || {}
  const sourceMap = options.sourceMap !== false

  return {
    name: 'optimize-arguments',

    transform (code, id) {
      const ast = tryParse(code, id)
      if (!ast) return null

      const magicString = new MagicString(code)

      // keep track of each BlockStatement so we know what scope we're in
      let funcBlocks = []
      let funcAndArrowBlocks = []
      let memberParents = []

      walk(ast, {
        enter (node, parent) {
          if (sourceMap) {
            magicString.addSourcemapLocation(node.start)
            magicString.addSourcemapLocation(node.end)
          }

          if (node.type === 'Identifier' && node.name === 'arguments') {
            let lastFuncBlock = funcBlocks[funcBlocks.length - 1]
            let lastBlock = funcAndArrowBlocks[funcAndArrowBlocks.length - 1]
            let lastMemberParent = memberParents[memberParents.length - 1]
            // arguments.length, arguments[i], etc. are okay
            // things like arguments.length are not okay for array
            // functions, because that means we are leaking via the closure
            // also you can't call e.g. arguments.pop(), so only certain
            // whitelisted operations are allowed, such as variable assignment
            if (!(parent.type === 'MemberExpression' &&
                !isArrowFunction(lastBlock.parent) &&
                validMemberParentToAvoidCloning(parent, lastMemberParent))) {
              magicString.overwrite(node.start, node.end, '$_args')
              if (!lastFuncBlock.written) {
                // preserve whitespace so indenting looks correct
                let whitespace = getLeadingWhitespace(
                  magicString.slice(lastFuncBlock.node.start + 1,
                    lastFuncBlock.node.body[0].start).toString())
                magicString.insertLeft(lastFuncBlock.node.start + 1,
                  whitespace + INSERTION)
                lastFuncBlock.written = true
              }
            }
          } else if (node.type === 'BlockStatement') {
            if (isFunction(parent)) {
              funcBlocks.push({ node, parent })
              funcAndArrowBlocks.push({ node, parent })
            } else if (isArrowFunction(parent)) {
              funcAndArrowBlocks.push({ node, parent })
            }
          } else if (node.type === 'MemberExpression') {
            memberParents.push(parent)
          }
        },
        leave (node, parent) {
          if (node.type === 'BlockStatement') {
            if (isFunction(parent)) {
              funcBlocks.pop()
              funcAndArrowBlocks.pop()
            } else if (isArrowFunction(parent)) {
              funcAndArrowBlocks.pop()
            }
          } else if (node.type === 'MemberExpression') {
            memberParents.pop()
          }
        }
      })

      return {
        code: magicString.toString(),
        map: sourceMap ? magicString.generateMap() : null
      }
    }
  }
}
export default optimizeArguments

