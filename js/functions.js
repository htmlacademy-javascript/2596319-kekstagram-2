function isPalindrome(string) {
  const normalString = string.toLowerCase().replaceAll(' ', '');
  const reverseString = string.toLowerCase().replaceAll(' ', '').split('').reverse().join('');
  return normalString === reverseString;
}

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
