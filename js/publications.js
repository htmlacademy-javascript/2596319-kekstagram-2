import { generateId, getRandomInteger, getRandomIndex } from './utils.js';

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
};

const getNextPhotoId = generateId();
const getNextCommentId = generateId();

function generateName() {
  return NAMES[getRandomIndex(NAMES)];
}

function generateMessage() {
  return MESSAGES[getRandomIndex(MESSAGES)];
}

function getComment() {
  const id = getNextCommentId();
  return {
    id: id,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: `${generateMessage()}`,
    name: `${generateName()}`
  };
}

function getComments(amount) {
  const comments = [];
  for (let i = 0; i < amount; i++) {
    comments.push(getComment());
  }
  return comments;
}

function getPublicationInfo() {
  const id = getNextPhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae..',
    likes: getRandomInteger(CONSTANT_VALUES.MIN_LIKES, CONSTANT_VALUES.MAX_LIKES),
    comments: getComments(getRandomInteger(CONSTANT_VALUES.MIN_COMMENTS, CONSTANT_VALUES.MAX_COMMENTS))
  };
}

function getPublications(amount) {
  const publications = [];
  for (let i = 0; i < amount; i++) {
    publications.push(getPublicationInfo());
  }
  return publications;
}

export { getPublications };
