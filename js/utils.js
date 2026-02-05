function generateId() {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomIndex(arr) {
  return getRandomInteger(0, arr.length - 1);
}

function validateLength(string, symbolsAmount) {
  return string.length <= symbolsAmount;
}

export { generateId, getRandomInteger, getRandomIndex, validateLength};
