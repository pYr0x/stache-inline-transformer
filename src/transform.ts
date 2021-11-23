import { createExpression, parse } from './stache'
import { Token, Node } from 'acorn'

function transformIntoExpression(_: Node): Node | undefined {
  let content = ''
  if (_.type === 'TemplateLiteral') {
    // @ts-ignore
    _.quasis.forEach((node: Token) => {
      content += node.value.raw
    })
  } else if (_.type === 'Literal') {
    // @ts-ignore
    content = _.value
  }
  if (content.length > 0) {
    return createExpression(parse(content))
  }
  return undefined
}
export default transformIntoExpression
