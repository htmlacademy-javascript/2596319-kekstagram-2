import { openFullMode } from './fullthumbnails.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

function createThumbnail(photo) {
  const thumbnail = template.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullMode(photo);
  });

  return thumbnail;
}

function createThumbnails(photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });
  container.appendChild(fragment);
}


export {createThumbnails};
