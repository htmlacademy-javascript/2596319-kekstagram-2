import { validateLength } from "./functions.js";

const MAX_HASHTAGS = 5;

const fileUploadControl = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const editFormClose = document.querySelector('.img-upload__cancel');
const photoEditForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const pristine = new Pristine(photoEditForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function openPhotoEditForm() {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function onDocumentKeydown(evt) {
  const isFieldFocused = document.activeElement === hashtagInput || document.activeElement === commentInput;
  if (evt.key === 'Escape' && !isFieldFocused) {
    evt.preventDefault();
    closePhotoEditForm();
  }
}

function hasValidHashtagFormat(hashtag) {
  return /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);
}

function validateHashtags(value) {
  if (!value) {
    return true;
  }

  const tags = value.trim().toLowerCase().split(/\s+/);

  const isCorrectFormat = tags.every(hasValidHashtagFormat);
  const isCorrectCount = tags.length <= MAX_HASHTAGS;
  const isUnique = new Set(tags).size === tags.length;

  return isCorrectFormat && isCorrectCount && isUnique;
}

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Хэштег должен начинаться с #, быть уникальным, должен быть разделён пробелом и их должно быть не больше 5'
);

pristine.addValidator(
  commentInput,
  (currentSymbolsAmount) => validateLength(currentSymbolsAmount, 140),
  'Комментарий должен содержать до 140 символов, включая пробелы'
);

function onPhotoUpload() {
  openPhotoEditForm();
}

function closePhotoEditForm() {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown');
  pristine.reset();
  photoEditForm.reset();
}

function onCrossClick() {
  closePhotoEditForm();
}

fileUploadControl.addEventListener('change', onPhotoUpload);
editFormClose.addEventListener('click', onCrossClick);
document.addEventListener('keydown', onDocumentKeydown);

export {openPhotoEditForm};
