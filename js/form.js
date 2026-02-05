import { validateLength } from './utils.js';

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;

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

function validateHashtags(inputString) {
  if (!inputString) {
    return true;
  }
  const tags = inputString.trim().toLowerCase().split(/\s+/);
  const isCorrectFormat = tags.every(hasValidHashtagFormat);
  const isCorrectCount = tags.length <= MAX_HASHTAGS;
  const isUnique = new Set(tags).size === tags.length;

  return isCorrectFormat && isCorrectCount && isUnique;
}

function getHashtagValidationError(inputString) {
  if (!inputString) {
    return true;
  }
  const tags = inputString.trim().toLowerCase().split(' ');
  if (tags.length > MAX_HASHTAGS) {
    return `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`;
  }
  const isUnique = new Set(tags).size === tags.length;
  if (!isUnique) {
    return 'Хэш-теги не должны повторяться';
  }
  const startsWithHash = tags.every((tag) => tag.startsWith('#'));
  if (!startsWithHash) {
    return 'Хэш-тег должен начинаться с символа #';
  }
  const hasInvalidChars = tags.some((tag) => /[^#a-zа-яё0-9]/i.test(tag));
  if (hasInvalidChars) {
    return 'Строка после решетки должна состоять из букв русского и латинского алфавитов и чисел';
  }
  const isLessThan20Symbols = tags.every((tag) => tag.length <= 20);
  if (!isLessThan20Symbols) {
    return 'Максимальная длина хэш-тега - 20 символов, включая решетку';
  }
  const doesNotOnlyContainHash = tags.every((tag) => /^#(?!\s*$).+/.test(tag));
  if (!doesNotOnlyContainHash) {
    return 'Хэш-тег не может состоять из одной решетки';
  }
}

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  getHashtagValidationError
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
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onCrossClick);
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
