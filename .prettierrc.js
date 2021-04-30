module.exports = {
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  singleQuote: true,
  trailingComma: 'none', // 尾随逗号
  arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  eslintIntegration: false, // 不让prettier使用eslint的代码格式进行校验
  tslintIntegration: false, // 不让prettier使用tslint的代码格式进行校验
  // printWidth: 60, //长度60以外换行
  jsxSingleQuote: false, // jsx使用双引号
  htmlWhitespaceSensitivity: 'ignore', // html中空格被认为不敏感的
};
