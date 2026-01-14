import {getPublications} from './publications.js';

const template = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');
const publications = getPublications(1);
const fragment = document.createDocumentFragment();

function createThumbnail(photo) {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
}

publications.forEach((publication) => {
  fragment.appendChild(createThumbnail(publication));
});
container.appendChild(fragment);

export {createThumbnail};
