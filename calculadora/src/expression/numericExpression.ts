import { Expression } from "../expression";

export class NumericExpression implements Expression {
  value: number;
  constructor(value: number) {
    this.value = value;
  }

  calcular(): number {
    return this.value;
  }
}
