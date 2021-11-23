import { Parser } from 'acorn'
// @ts-ignore
import classFields from 'acorn-class-fields'
// @ts-ignore
import staticClassFeatures from 'acorn-static-class-features'

function parse(
  code: string,
  whichModules: Array<string>
): { ast: acorn.Node; comments: Array<any> } {
  let comments = undefined
  if (whichModules.indexOf('inline-stache') >= 0) {
    comments = []
  }
  const ast = Parser.extend(classFields)
    .extend(staticClassFeatures)
    .parse(code, {
      onComment: comments,
      sourceType: 'module',
      ecmaVersion: 'latest'
    })
  return {
    ast,
    comments: comments || []
  }
}

export default parse
