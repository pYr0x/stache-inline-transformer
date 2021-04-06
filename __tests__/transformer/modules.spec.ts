import modules from "../../src/transformer/modules";
import { promises as fs } from "fs"
import path from "path";

describe("transformer", () => {
  it("find a can-stache-element transformer", async () => {
    const code = await fs.readFile("__tests__/files/can-stache-element.js", {encoding: "utf-8"});
    expect(modules(code)).toEqual(expect.arrayContaining(['can-stache-element']));
  });
  it("find a can-component transformer", async () => {
    const code = await fs.readFile("__tests__/files/can-component.js", {encoding: "utf-8"});
    expect(modules(code)).toEqual(expect.arrayContaining(['can-component']));
  });
  it("find a can-stache transformer", async () => {
    const code = await fs.readFile("__tests__/files/can-stache.js", {encoding: "utf-8"});
    expect(modules(code)).toEqual(expect.arrayContaining(['can-stache']));
  });
  it("find a inline-stache transformer", async () => {
    const code = await fs.readFile("__tests__/files/inline-stache.js", {encoding: "utf-8"});
    expect(modules(code)).toEqual(expect.arrayContaining(['inline-stache']));
  });
});
