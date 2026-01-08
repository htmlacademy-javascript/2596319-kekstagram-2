const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Неопознанный Енот',
  'Артём',
  'Олег',
  'Крокодил',
  'Кекс',
  'keksobot',
  'Снежок',
  'Геннадий',
  'Милана',
  'Константин'
];

const CONSTANT_VALUES = {
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  MIN_COMMENTS: 0,
  MAX_COMMENTS: 30
}

function generateId() {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const getNextPhotoId = generateId();
const getNextCommentId = generateId();

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomIndex(arr) {
  return getRandomInteger(0, arr.length - 1);
}

function generateName() {
  return NAMES[getRandomIndex(NAMES)];
}

function generateMessage() {
  return MESSAGES[getRandomIndex(MESSAGES)];
}

export {getNextPhotoId, getRandomInteger, getNextCommentId, generateName, generateMessage};
