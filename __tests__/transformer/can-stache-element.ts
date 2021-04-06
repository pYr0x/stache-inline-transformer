import transform from "../../src/transformer/can-stache-element";
import { promises as fs } from "fs"
import path from "path";
import whichModules from "../../src/transformer/modules";
import parse from "../../src/parse";
// @ts-ignore
import {base, simple} from "acorn-walk";

describe("can-stache-element", () => {
  it("transform into ArrayExpression", async () => {
    const code = await fs.readFile("__tests__/files/can-stache-element.js", {encoding: "utf-8"});
    const {ast, comments} = parse(code, whichModules(code))
    transform(ast);

    simple(ast, {
      PropertyDefinition(_) {
        // @ts-ignore
        if(_.key.name === "view"){
          // @ts-ignore
          expect(_.value.type).toEqual('ArrayExpression')
        }

      }
    }, {
      ...base,
      PropertyDefinition: () => {}
    })
  })
})
