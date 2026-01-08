import {getNextPhotoId, getRandomInteger, getNextCommentId, generateName, generateMessage} from './util.js';

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
    likes: getRandomInteger(15, 200),
    comments: getComments(getRandomInteger(0, 30))
  };
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

function getPublications(amount) {
  const publications = [];
  for (let i = 0; i < amount; i++) {
    publications.push(getPublicationInfo());
  }
  return publications;
}

export {getPublications};
