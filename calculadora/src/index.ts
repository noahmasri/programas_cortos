import { ExpressionParser } from "./expressionParser";

console.log("hello world");

const operators: {
  [key: string]: { precedence: number; associativity: string };
} = {
  "+": { precedence: 2, associativity: "L" },
  "-": { precedence: 2, associativity: "L" },
  "*": { precedence: 3, associativity: "L" },
  "/": { precedence: 3, associativity: "L" },
};
// priorizo prod y division antes q suma y resta, y todas se hacen a izquierda (no asi sería el ^)
// el () fuerza la precedencia

const parser = new ExpressionParser("((2+4)*5-3)/2", operators);
const expres = parser.parse();
console.log(expres.calcular());
// /^[0-9]+[+\-*/][0-9]+$/
