import { Expression } from "../expression";

export abstract class MathExpression implements Expression {
  left: Expression;
  right: Expression;
  constructor(left: Expression, right: Expression) {
    this.left = left;
    this.right = right;
  }

  abstract reduceArgs(left: number, right: number): number;
  calcular(): number {
    return this.reduceArgs(this.left.calcular(), this.right.calcular());
  }
}
