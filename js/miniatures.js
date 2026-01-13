const templateThumbnail = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

function renderThumbnails(pictures) {
  const thumbnails = document.createDocumentFragment();

  pictures.forEach(({url, description, likes, comments}) => {
    const thumbnail = templateThumbnail.cloneNode(true);

    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.querySelector('.picture__likes').textContent = likes;

    thumbnails.appendChild(thumbnail);
  });

  pictures.appendChild(thumbnails);
}

export {renderThumbnails};
