// @ts-ignore
import { findNodeAfter, ancestor } from 'acorn-walk'
import transformIntoExpression from '../transform'
import { Node } from 'acorn'

function transform(ast: Node, comments: Array<any>): Node {
  comments.forEach((comment) => {
    if (comment?.value.trim() === 'stache' && comment?.type === 'Block') {
      const node = findNodeAfter(ast, comment.end)

      if (node?.node) {
        const expression = transformIntoExpression(node.node)
        if (expression) {
          ancestor(ast, {
            Literal(currentNode, state: Array<any>) {
              if (currentNode === node.node) {
                const parent = state[state.length - 2]
                parent.init = expression
              }
            },
            TemplateLiteral(currentNode, state: Array<any>) {
              if (currentNode === node.node) {
                const parent = state[state.length - 2]
                parent.init = expression
              }
            }
          })
        }
      }
    }
  })
  return ast
}
export default transform
