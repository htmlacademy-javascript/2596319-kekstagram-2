const bigPicture = document.querySelector('.big-picture');
const close = document.querySelector('.big-picture__cancel');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsStep = 5;
let currentComments = [];
let commentsShown = 0;


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
  commentsLoader.removeEventListener('click', onLoadMorePhotosClick);
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

function onLoadMorePhotosClick() {
  const fragment = document.createDocumentFragment();
  const slicedComments = currentComments.slice(commentsShown, commentsShown + commentsStep);
  slicedComments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });
  commentsList.appendChild(fragment);
  commentsShown += slicedComments.length;
  commentsCount.textContent = commentsShown;

  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}

function openFullMode(photo) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigImage.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  totalCommentsCount.textContent = photo.comments.length;
  commentsList.innerHTML = '';
  commentsShown = 0;
  currentComments = photo.comments;
  onLoadMorePhotosClick();
  commentsLoader.addEventListener('click', onLoadMorePhotosClick);
  close.addEventListener('click', onFullModeCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
}
export {openFullMode};
