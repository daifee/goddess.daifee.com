/**
 * 比较两个值
 * @param {*} a 值一
 * @param {string} operator 关系运算符
 * @param {*} b 值二
 * @param {*} options
 */


export default function compare(a, operator, b, options) {
  if (arguments.length < 4) {
    throw new Error('handlebars Helper {{compare}} expects 4 arguments');
  }

  let result;
  switch (operator) {
    case '===':
      result = a === b;
      break;
    case '!==':
      result = a !== b;
      break;
    case '<':
      result = a < b;
      break;
    case '>':
      result = a > b;
      break;
    case '<=':
      result = a <= b;
      break;
    case '>=':
      result = a >= b;
      break;
    case 'typeof':
      result = typeof a === b;
      break;
    case 'include':
      result = a.split('|').indexOf(b) !== -1;
      break;
    default:
    {
      throw new Error('helper {{compare}}: invalid operator: `' + operator + '`');
    }
  }

  if (result === false) {
    return options.inverse(this);
  }
  return options.fn(this);
}
