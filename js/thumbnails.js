import { openFullMode } from './fullthumbnails.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');


function createThumbnail(photo) {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  image.alt = photo.description;
  image.src = photo.url;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullMode(photo);
  });

  return thumbnail;
}

function createThumbnails(thumbnails) {
  const fragment = document.createDocumentFragment();
  thumbnails.forEach((thumbnail) => {
    fragment.appendChild(createThumbnail(thumbnail));
  });
  container.appendChild(fragment);
}


export {createThumbnails};
