import {generate} from "astring";
import {Node} from "acorn";

function codeGeneration(ast: Node, generator: any){
  return generate(ast, {});
}

export default codeGeneration
