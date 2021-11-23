import { generate } from 'astring'
import { Node } from 'acorn'

function codeGeneration(ast: Node) {
  return generate(ast, {})
}

export default codeGeneration
