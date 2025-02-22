export interface MathTreeNode {
  calculate(x: number): number;
  toString(parantheses: boolean): string;
}

export class BinaryNode implements MathTreeNode {
  operator: string;
  left: MathTreeNode;
  right: MathTreeNode;
  constructor(op: string, l: MathTreeNode, r: MathTreeNode) {
    this.operator = op;
    this.left = l;
    this.right = r;
  }

  toString(parantheses: boolean): string {
    let str: string;
    switch (this.operator) {
      case '+':
        str =
          this.left.toString(
            precedence[(this.left as BinaryNode).operator] < precedence['+']
          ) +
          ' + ' +
          this.right.toString(
            precedence[(this.right as BinaryNode).operator] < precedence['+']
          );
        break;
      case '-':
        str =
          this.left.toString(
            precedence[(this.left as BinaryNode).operator] < precedence['-']
          ) +
          ' - ' +
          this.right.toString(
            precedence[(this.right as BinaryNode).operator] < precedence['-']
          );
        break;
      case '*':
        str =
          this.left.toString(
            precedence[(this.left as BinaryNode).operator] < precedence['*']
          ) +
          ' * ' +
          this.right.toString(
            precedence[(this.right as BinaryNode).operator] < precedence['*']
          );
        break;
      case '/':
        str =
          this.left.toString(
            precedence[(this.left as BinaryNode).operator] < precedence['/']
          ) +
          ' / ' +
          this.right.toString(
            (this.right as BinaryNode).operator == '/' ||
              precedence[(this.right as BinaryNode).operator] < precedence['/']
          );
        break;
      case '^':
        str =
          this.left.toString(
            (this.left instanceof NumberNode &&
              (this.left as NumberNode).calculate(0) < 0) ||
              this.left instanceof BinaryNode
          ) +
          ' ^ ' +
          this.right.toString(
            precedence[(this.right as BinaryNode).operator] < precedence['^']
          );
        break;
      default:
        str = '';
    }
    return parantheses ? '(' + str + ')' : str;
  }

  calculate(x: number): number {
    switch (this.operator) {
      case '+':
        return this.left.calculate(x) + this.right.calculate(x);
      case '-':
        return this.left.calculate(x) - this.right.calculate(x);
      case '*':
        return this.left.calculate(x) * this.right.calculate(x);
      case '/':
        return this.left.calculate(x) / this.right.calculate(x);
      case '^':
        return Math.pow(this.left.calculate(x), this.right.calculate(x));
      default:
        return NaN;
    }
  }
}

export class UnaryNode implements MathTreeNode {
  operator: string;
  value: MathTreeNode;

  constructor(op: string, val: MathTreeNode) {
    this.operator = op;
    this.value = val;
  }

  calculate(x: number): number {
    switch (this.operator) {
      case 'neg':
        return -this.value.calculate(x);
      case 'sin':
        return Math.sin(this.value.calculate(x)*Math.PI/180)
      default:
        return NaN;
    }
  }
  toString(parantheses: boolean): string {
    let str: string;
    switch (this.operator) {
      case 'neg':
        str = '-' + this.value.toString(false);
        break;
      case 'sin':
        str = 'sin' + this.value.toString(true)
        break
      case 'cos':
        str = 'cos' + this.value.toString(true)
        break
      case 'tan':
        str = 'tan' + this.value.toString(true)
        break
      case 'cot':
        str = 'cot' + this.value.toString(true)
        break
      default:
        str = '';
    }
    return parantheses ? '(' + str + ')' : str;
  }
}

export class NumberNode implements MathTreeNode {
  value: string;
  constructor(val: string) {
    this.value = val;
  }
  toString(parantheses: boolean): string {
    return parantheses ? '(' + this.value + ')' : this.value;
  }
  calculate(x: number): number {
    if (this.value === 'x' ) {
      return x
    }
    return parseFloat(this.value);
  }
}

function isOperator(op: string) {
  return ['+', '-', '*', '/', 'neg', '^', 'sin', 'cos', 'tan', 'cot'].indexOf(op) !== -1;
}

function isUnaryOperator(op: string): boolean {
  return ['neg', 'sin', 'cos', 'tan', 'cot'].indexOf(op) !== -1;
}

export const precedence: Record<string, Number> = {
  'sin':5,
  'cos':5,
  'tan':5,
  'cot':5,
  '^': 4,
  neg: 3,
  '*': 2,
  '/': 2,
  '+': 1,
  '-': 1,
};

function infixToPostFix(input: string): string[] {
  const tokens = input.match(/\d+(\.\d+)?|[+\-*/^()]|(sin|cos|tan|cot)|x/g) || [];
  const output: string[] = [];
  const operators: string[] = [];
  let prevToken = '';
  for (const t in tokens) {
    if (!isNaN(Number(tokens[t])) || tokens[t] === 'x') {
      if (
        tokens[t] !== 'x' && operators[operators.length - 1] === 'neg' &&
        ((Number(t) + 1 < tokens.length && tokens[Number(t) + 1] !== '^') ||
          Number(t) + 1 >= tokens.length)
      ) {
        operators.pop();
        output.push('-' + tokens[t]);
      } else {
        output.push(tokens[t]);
      }
    } else if (isOperator(tokens[t])) {
      if (
        tokens[t] === '-' &&
        (prevToken === '' || isOperator(prevToken) || prevToken === '(')
      ) {
        operators.push('neg');
      } else {
        while (
          operators.length > 0 &&
          isOperator(operators[operators.length - 1]) &&
          ((precedence[operators[operators.length - 1]] >=
            precedence[tokens[t]] &&
            tokens[t] !== '^') ||
            (precedence[operators[operators.length - 1]] >
              precedence[tokens[t]] &&
              tokens[t] === '^'))
        ) {
          output.push(operators.pop()!);
        }
        operators.push(tokens[t]);
      }
    } else if (tokens[t] === '(') {
      operators.push(tokens[t]);
    } else if (tokens[t] === ')') {
      while (operators.length > 0 && operators[operators.length - 1] !== '(') {
        output.push(operators.pop()!);
      }
      operators.pop();
    }
    prevToken = tokens[t];
  }
  while (operators.length > 0) {
    output.push(operators.pop()!);
  }
  return output;
}

export function mathTree(input: string): MathTreeNode {
  let stack: MathTreeNode[] = [];
  const tokens = infixToPostFix(input);
  for (const token of tokens) {
    if (!isOperator(token)) {
      stack.push(new NumberNode(token));
    } else if (isUnaryOperator(token)) {
      const operator = stack.pop();
      if (operator) {
        stack.push(new UnaryNode(token, operator));
      }
    } else {
      const right = stack.pop();
      const left = stack.pop();
      if (left && right) {
        stack.push(new BinaryNode(token, left, right));
      }
    }
  }
  return stack.pop()!;
}
