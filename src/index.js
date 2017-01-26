import { walk } from 'estree-walker'
import { parse } from 'acorn'
import MagicString from 'magic-string'

const INSERTION = 'var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }'

function tryParse (code, id) {
  try {
    return parse(code, {
      ecmaVersion: 6,
      sourceType: 'module'
    })
  } catch (err) {
    console.warn(`rollup-plugin-optimize-arguments: failed to parse ${id}. Consider restricting the plugin to particular files via options.include`)
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
      let blocks = []

      walk(ast, {
        enter (node, parent) {
          if (sourceMap) {
            magicString.addSourcemapLocation(node.start)
            magicString.addSourcemapLocation(node.end)
          }

          if (node.type === 'Identifier' && node.name === 'arguments') {
            magicString.overwrite(node.start, node.end, '$_args')
            let lastBlock = blocks[blocks.length - 1]
            if (!lastBlock.__written) {
              // preserve whitespace so indenting looks correct
              let whitespace = getLeadingWhitespace(
                magicString.slice(lastBlock.start + 1, lastBlock.body[0].start).toString())
              magicString.insertLeft(lastBlock.start + 1, whitespace + INSERTION)
              lastBlock.__written = true
            }
          } else if (node.type === 'BlockStatement' && isFunction(parent)) {
            blocks.push(node)
          }
        },
        leave (node, parent) {
          if (node.type === 'BlockStatement' && isFunction(parent)) {
            blocks.pop()
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

