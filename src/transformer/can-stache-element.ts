// @ts-nocheck
import {base, ancestor} from "acorn-walk";
import transformIntoExpression from "../transform";

function transform(ast: acorn.Node): acorn.Node {
  ancestor(ast, {
    PropertyDefinition(_, ancestors) {
      if (_.static && _.key.name === "view" && (_.value.type === "TemplateLiteral" || _.value.type === "Literal")) {
        const expression = transformIntoExpression(_.value);
        if (expression) {
          _.value = expression
        }
      }
    }
  }, {
    ...base,
    PropertyDefinition: () => {
    }
  });
  return ast;
}

export default transform;

