import { promises as fs } from "fs"
import parse from "../dist/parse";
import whichModules from "../src/transformer/modules";

describe("parse", () => {
  it("produces a AST for ES6", async () => {
    const code = await fs.readFile("__tests__/files/can-stache-element.js", {encoding: "utf-8"})
    const {ast, comments} = parse(code, whichModules(code))

    expect(ast).toEqual(expect.any(Object))
    expect(comments).toEqual([])
  });
  it("finds the inline stache comments", async () => {
    const code = await fs.readFile("__tests__/files/inline-stache.js", {encoding: "utf-8"})
    const {ast, comments} = parse(code, whichModules(code))

    expect(ast).toEqual(expect.any(Object))
    expect(comments).toHaveLength(1)
  });
});
