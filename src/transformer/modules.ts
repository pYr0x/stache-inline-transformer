function whichModules(code: string) {
  const modules = [];
  if(code.search('StacheElement') > 0){
    // found a StacheElement Component
    modules.push('can-stache-element');
  }
  if(code.search(/Component\.extend\s*?\(/) > 0){
    // found a legacy can-component
    modules.push('can-component')
  }
  if(code.search(/stache\s*?\(/) > 0){
    // found a inline stache render function
    modules.push('can-stache');
  }
  if(code.search(/\*\s*?stache\s*?\*/) > 0){
    // found a inline stache comment
    modules.push('inline-stache');
  }

  return modules;
}

export default whichModules;
