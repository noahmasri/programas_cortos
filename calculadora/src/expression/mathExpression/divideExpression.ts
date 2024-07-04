import { MathExpression } from "../mathExpression";

export class DivideExpression extends MathExpression {
  reduceArgs(left: number, right: number): number {
    if (right === 0) {
      throw new Error("cannot divide by 0");
    }
    return left / right;
  }
}
