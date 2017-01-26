import { walk } from 'estree-walker'
import { parse } from 'acorn'
import MagicString from 'magic-string'
import { attachScopes, createFilter } from 'rollup-pluginutils';

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

function optimizeArguments (options) {
  options = options || {}
  const sourceMap = options.sourceMap !== false

  return {
    name: 'optimize-arguments',

    transform (code, id) {
      const ast = tryParse(code, id)
      if (!ast) return null

      const magicString = new MagicString(code)

      let scope = attachScopes(ast, 'scope')

      walk(ast, {
        enter (node) {
          console.log('enter', node, parent)
          if (node.scope) {
            console.log(node)
            scope = node.scope
          }
          if (sourceMap) {
            magicString.addSourcemapLocation(node.start)
            magicString.addSourcemapLocation(node.end)
          }

          if (node.type === 'Identifier' && node.name === 'arguments') {
            magicString.overwrite(node.start, node.end, '$_args')
            console.log('writing!')
            /*if (lastFunction) {
              let whitespace = magicString.slice(lastFunction.body.start + 1, lastFunction.body.body[0].start)
              magicString.insertLeft(lastFunction.body.start + 1, whitespace + INSERTION)
              lastFunction = null
            }*/
          }
        },
        leave (node, parent) {
          console.log('leave', node, parent)
          if (node.scope) {
            scope = scope.parent
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

