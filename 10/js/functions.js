export function validateLength(string, symbolsAmount) {
  return string.length <= symbolsAmount;
}
console.log(validateLength('меньше20символов', 20));
console.log(validateLength('длина строки 18 си', 18));
console.log(validateLength('строка длиннее 10 символов', 10));

function isPalindrome(string) {
  const normalString = string.toLowerCase().replaceAll(' ', '');
  const reverseString = string.toLowerCase().replaceAll(' ', '').split('').reverse().join('');
  return normalString === reverseString;
}
console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));

function extractNumbers(string) {
  const extractedNumbers = [];
  const str = String(string);
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ' && !isNaN(str[i])) {
      extractedNumbers.push(Number(str[i]));
    }
  }
  return extractedNumbers.length > 0 ? Number(extractedNumbers.join('')) : NaN;
}

console.log(extractNumbers('2023 год'));
console.log(extractNumbers('ECMAScript 2022'));
console.log(extractNumbers('1 кефир, 0.5 батона'));
console.log(extractNumbers('агент 007'));
console.log(extractNumbers('а я томат'));
