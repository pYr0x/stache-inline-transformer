import {parse, createExpression} from "../dist/stache";

describe("parse", () => {
  it("produces a AST from a stache template", () => {
    const stacheAst = parse('hello {{world}}')
    expect(stacheAst).toMatchSnapshot()
    // expect(stacheAst.intermediate.length).toBeGreaterThan(0)
  })
  it("it generates an array expression", () => {
    const stacheAst = parse('hello {{world}}')
    const node = createExpression(stacheAst)
    expect(node).toMatchSnapshot()
  })
})
