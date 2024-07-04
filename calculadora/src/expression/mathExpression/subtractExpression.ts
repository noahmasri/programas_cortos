import { MathExpression } from "../mathExpression";

export class SubtractExpression extends MathExpression {
  reduceArgs(left: number, right: number): number {
    return left - right;
  }
}
