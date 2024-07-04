import { MathExpression } from "../mathExpression";

export class MultiplyExpression extends MathExpression {
  reduceArgs(left: number, right: number): number {
    return left * right;
  }
}
