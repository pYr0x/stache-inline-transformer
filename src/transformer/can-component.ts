// @ts-nocheck
import { ancestor } from 'acorn-walk'
import transformIntoExpression from '../transform'

function transform(ast: acorn.Node): acorn.Node {
  ancestor(ast, {
    Property(_) {
      if (
        _.key.name === 'view' &&
        (_?.value.type === 'TemplateLiteral' || _?.value.type === 'Literal')
      ) {
        const expression = transformIntoExpression(_.value)
        if (expression) {
          _.value = expression
        }
      }
    }
  })
  return ast
}

export default transform
