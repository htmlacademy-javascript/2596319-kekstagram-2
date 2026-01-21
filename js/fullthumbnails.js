const bigPicture = document.querySelector('.big-picture');
const close = document.querySelector('.big-picture__cancel');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onFullModeCloseClick();
  }
}

function onFullModeCloseClick() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  close.removeEventListener('click', onFullModeCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function createCommentElement({ avatar, name, message }) {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  comment.innerHTML = `
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  `;

  return comment;
}

function openFullMode(photo) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigImage.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  totalCommentsCount.textContent = photo.comments.length;
  commentsCount.textContent = photo.comments.length;
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });
  commentsList.appendChild(fragment);
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  close.addEventListener('click', onFullModeCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

export {openFullMode};
