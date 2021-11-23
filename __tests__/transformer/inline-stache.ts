import transform from "../../dist/transformer/inline-stache";
import { promises as fs } from "fs"
import whichModules from "../../dist/transformer/modules";
import parse from "../../dist/parse";
import {parse as stache} from "../../dist/stache";
// @ts-ignore
import {base, ancestor, simple} from "acorn-walk";
import codeGeneration from "../../dist/generator";

describe("inline stache", () => {
  it("transform into ArrayExpression", async () => {
    const code = await fs.readFile("__tests__/files/inline-stache.js", {encoding: "utf-8"});
    const {ast, comments} = parse(code, whichModules(code))
    transform(ast, comments)

    simple(ast, {
      VariableDeclaration(_) {
        // @ts-ignore
        if(_.id){
          // @ts-ignore
          expect(_.id.name).toEqual('template')
          // @ts-ignore
          expect(_.init.type).toEqual('ArrayExpression')
        }
      }
    })
  })

  it("generate code", async () => {
    const code = await fs.readFile("__tests__/files/inline-stache.js", {encoding: "utf-8"});
    const {ast, comments} = parse(code, whichModules(code))
    const newAST = transform(ast, comments)
    let  newCode = codeGeneration(newAST).replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g,'');

    const stacheAST = stache("<h1>Hello_{{world}}</h1>");
    const objectRepresentation = JSON.stringify(stacheAST.intermediate);

    expect(newCode).toEqual(expect.stringContaining(objectRepresentation));
  })
})
