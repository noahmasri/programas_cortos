import { MathExpression } from "../mathExpression";

export class SumExpression extends MathExpression {
  reduceArgs(left: number, right: number): number {
    return left + right;
  }
}
