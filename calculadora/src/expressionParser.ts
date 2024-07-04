import { Expression } from "./expression";
import { buildExpressionTree } from "./expressionBuilder";

// adapter from string to builder.
// converts expression in infix notation to reverse polish notation
export class ExpressionParser {
  expression: string;
  operators: {
    [key: string]: { precedence: number; associativity: string };
  };

  constructor(
    expression: string,
    operatorsAllowed: {
      [key: string]: { precedence: number; associativity: string };
    }
  ) {
    this.expression = expression;
    this.operators = operatorsAllowed;
  }

  parse(): Expression {
    const tokens = this.tokenize(this.expression);
    const outputQueue = this.shuntingYard(tokens); // dijkstra's algorythm
    console.log(outputQueue);
    // expression tree construction
    return buildExpressionTree(outputQueue);
  }

  // removes " "
  private tokenize(expression: string): string[] {
    return expression.match(/\d+|[+\-*/()]/g) || [];
  }

  private isSymbol(token: string): boolean {
    return "*/+-".includes(token);
  }

  // checks if operator A has priority over B
  private operatorHasPriority(operatorA: string, operatorB: string): boolean {
    const opA = this.operators[operatorA];
    const opB = this.operators[operatorB];

    if (opB.associativity === "L") {
      return opB.precedence <= opA.precedence;
    } else if (opB.associativity === "R") {
      return opB.precedence < opA.precedence;
    }

    return false;
  }

  // shunting yard dijkstra
  shuntingYard(tokens: string[]): string[] {
    const outputQueue: string[] = [];
    const operatorStack: string[] = [];

    tokens.forEach((token) => {
      if (/\d/.test(token)) {
        outputQueue.push(token);
      } else if ("+-*/".includes(token)) {
        while (
          operatorStack.length > 0 &&
          this.isSymbol(operatorStack[operatorStack.length - 1]) &&
          this.operatorHasPriority(
            operatorStack[operatorStack.length - 1],
            token
          )
        ) {
          outputQueue.push(operatorStack.pop()!);
        }
        operatorStack.push(token);
      } else if (token === ")") {
        // found ')', goes find its corresponding '('
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== "("
        ) {
          outputQueue.push(operatorStack.pop()!); // adds operators to output queue
        }
        operatorStack.pop(); // deletes '(' from stack
      }
    });

    // empties queue
    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop()!);
    }

    return outputQueue;
  }
}
