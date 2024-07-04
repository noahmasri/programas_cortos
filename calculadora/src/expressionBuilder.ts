import { Expression } from "./expression";
import { NumericExpression } from "./expression/numericExpression";
import { MathExpressionFactory } from "./expressionFactory";

// builds expression from reverse polish notation
export function buildExpressionTree(tokens: string[]): Expression {
  const builder = new ExpressionBuilder();
  tokens.forEach((token) => {
    if (/\d/.test(token)) {
      builder.addNumeric(token);
    } else {
      builder.addBinary(token);
    }
  });

  return builder.getResult();
}

class ExpressionBuilder {
  private stack: Expression[] = [];

  addNumeric(value: string): void {
    this.stack.push(new NumericExpression(Number(value)));
  }

  addBinary(token: string): void {
    const right = this.stack.pop()!;
    const left = this.stack.pop()!;
    this.stack.push(MathExpressionFactory.createExpression(token, left, right));
  }

  getResult(): Expression {
    if (this.stack.length !== 1) {
      throw new Error("Invalid expression format");
    }
    return this.stack[0];
  }
}
