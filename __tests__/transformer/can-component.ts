import transform from "../../src/transformer/can-component";
import {default as transformAll} from "../../src/index";
import { promises as fs } from "fs"
import whichModules from "../../src/transformer/modules";
import parse from "../../src/parse";
import {simple} from "acorn-walk";
import codeGeneration from "../../src/generator";
import {parse as stache} from "../../src/stache";

describe("can-component", () => {
  it("transform into ArrayExpression", async () => {
    const code = await fs.readFile("__tests__/files/can-component.js", {encoding: "utf-8"});
    const {ast} = parse(code, whichModules(code))
    transform(ast);
    simple(ast, {
      Property(_) {
        // @ts-ignore
        if(_.key.name === "view"){
          // @ts-ignore
          expect(_.value.type).toEqual('ArrayExpression')
        }
      }
    })
  })

  it("generate code", async () => {
    const code = await fs.readFile("__tests__/files/can-component.js", {encoding: "utf-8"});
    // const {ast, comments} = parse(code, whichModules(code))
    // const newAST = transform(ast)
    //
    // let  newCode = codeGeneration(newAST, {}).replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g,'');

    let newCode = transformAll(code).replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g,'');

    const stacheAST = stache("<h1>Hello_{{world}}</h1>");
    const objectRepresentation = JSON.stringify(stacheAST.intermediate);

    expect(newCode).toEqual(expect.stringContaining(objectRepresentation));
  })
})
