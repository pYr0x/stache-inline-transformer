import parse from './parse'
import whichModules from './transformer/modules'
import { default as transformComponent } from './transformer/can-component'
import { default as transformStache } from './transformer/can-stache'
import { default as transformStacheElement } from './transformer/can-stache-element'
import { default as transformInlineStache } from './transformer/inline-stache'
import codeGeneration from './generator'

function stacheTransformer(code: string) {
  const modules = whichModules(code)
  const { ast, comments } = parse(code, modules)

  modules.forEach((module) => {
    switch (module) {
      case 'can-component':
        transformComponent(ast)
        break
      case 'can-stache':
        transformStache(ast)
        break
      case 'can-stache-element':
        transformStacheElement(ast)
        break
      case 'inline-stache':
        transformInlineStache(ast, comments)
        break
    }
  })

  return codeGeneration(ast)
}

export default stacheTransformer
