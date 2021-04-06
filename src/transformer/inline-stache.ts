// @ts-ignore
import {findNodeAfter, simple, ancestor, base} from "acorn-walk";
import {createExpression, parse} from "../stache";
import transformIntoExpression from "../transform";

function transform(ast: acorn.Node, comments: Array<any>): acorn.Node {
  comments.forEach((comment) => {
    if(comment?.value.trim() === "stache" && comment?.type === "Block"){
      const node = findNodeAfter(ast, comment.end);

      if(node?.node){
        const expression = transformIntoExpression(node.node);
        if (expression) {
          ancestor(ast, {
              Literal(currentNode, state: Array<any>) {
                if(currentNode === node.node){
                  const parent = state[state.length-2];
                  parent.init = expression;
                }
              },
              TemplateLiteral(currentNode, state: Array<any>) {
                if(currentNode === node.node){
                  const parent = state[state.length-2];
                  parent.init = expression;
                }
              }
          });
        }
      }
    }
  })
  return ast
}
export default transform;

