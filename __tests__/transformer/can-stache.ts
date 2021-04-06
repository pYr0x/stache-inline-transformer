import transform from "../../src/transformer/can-stache";
import { promises as fs } from "fs"
import whichModules from "../../src/transformer/modules";
import parse from "../../src/parse";
import {simple} from "acorn-walk";
import codeGeneration from "../../src/generator";
import {parse as stache} from "../../src/stache";

describe("can-stache", () => {
  it("transform into ArrayExpression", async () => {
    const code = await fs.readFile("__tests__/files/can-stache.js", {encoding: "utf-8"});
    const {ast, comments} = parse(code, whichModules(code))
    const newAST = transform(ast);
    simple(newAST, {
      CallExpression(_) {
        // @ts-ignore
        expect(_.callee.name).toEqual('stache')
        // @ts-ignore
        expect(_.arguments[0].type).toEqual('ArrayExpression')
      }
    })
  })

  it("generate code", async () => {
    const code = await fs.readFile("__tests__/files/can-stache.js", {encoding: "utf-8"});
    const {ast, comments} = parse(code, whichModules(code))
    const newAST = transform(ast)
    let  newCode = codeGeneration(newAST, {}).replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g,'');

    const stacheAST = stache("<h1>Hello_{{world}}</h1>");
    const objectRepresentation = JSON.stringify(stacheAST.intermediate);

    expect(newCode).toEqual(expect.stringContaining(objectRepresentation));
  })
})
