import { Expression } from "./expression";
import { SubtractExpression } from "./expression/mathExpression/subtractExpression";
import { DivideExpression } from "./expression/mathExpression/divideExpression";
import { MultiplyExpression } from "./expression/mathExpression/multiplyExpression";
import { SumExpression } from "./expression/mathExpression/sumExpression";

export class MathExpressionFactory {
  public static createExpression(
    token: string,
    left: Expression,
    right: Expression
  ): Expression {
    switch (token) {
      case "+":
        return new SumExpression(left, right);
      case "-":
        return new SubtractExpression(left, right);
      case "*":
        return new MultiplyExpression(left, right);
      case "/":
        return new DivideExpression(left, right);
      default:
        throw new Error("invalid symbol in expression");
    }
  }
}
