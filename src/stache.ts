import {Parser} from "acorn";
import {findNodeAt} from "acorn-walk";
// @ts-ignore
import stache from "can-stache-ast";

interface stacheType {
  tokenType: string
  args: []
}

interface stacheAST {
  intermediate: Array<stacheType>
  program: Array<stacheType>
  imports: []
  dynamicImports: []
  importDeclarations: []
}

export function parse(template: string): stacheAST{
  return stache.parse(template.trim());
}

export function createExpression(stacheAst: stacheAST): acorn.Node | undefined {
  if(stacheAst.intermediate){
    const ast = Parser.parse(JSON.stringify(stacheAst.intermediate), {ecmaVersion: 2015});
    const arrayExpression = findNodeAt(ast, 0);
    if(arrayExpression && arrayExpression.node){
      return arrayExpression.node
    }
  }
  return undefined
}
