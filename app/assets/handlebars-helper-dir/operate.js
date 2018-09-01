/**
 * 算术运算
 * @param {*} a 值一
 * @param {string} operator 算术运算符
 * @param {*} b 值二
 */


export default function operate(a, operator, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return 0;
  }
}
