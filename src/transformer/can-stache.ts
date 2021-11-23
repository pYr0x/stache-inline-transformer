// @ts-nocheck
import { ancestor } from 'acorn-walk'
import transformIntoExpression from '../transform'

function transform(ast: acorn.Node): acorn.Node {
  ancestor(ast, {
    CallExpression(_) {
      if (_.callee.name === 'stache' && _.arguments.length === 1) {
        const expression = transformIntoExpression(_.arguments[0])
        if (expression) {
          _.arguments[0] = expression
        }
      }
    }
  })
  return ast
}

export default transform
