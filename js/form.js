import { validateLength } from './utils.js';
import { initScale } from './scale.js';
import { resetSlider } from './slider.js';
import { loadData, Route, Method } from './data.js';
import { showSuccessMessage, showErrorMessage, getMessageElement } from './messages.js';

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENTS_LENGTH = 140;
const AVAILABLE_FILE_TYPES = ['png', 'jpg', 'jpeg'];

const fileUploadControl = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const editFormClose = document.querySelector('.img-upload__cancel');
const photoEditForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const filePreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(photoEditForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function openPhotoEditForm() {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  editFormClose.addEventListener('click', onCrossClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function onDocumentKeydown(evt) {
  const messageOpen = !!getMessageElement();
  const isFieldFocused = document.activeElement === hashtagInput || document.activeElement === commentInput;
  if (evt.key === 'Escape' && !isFieldFocused && !messageOpen) {
    evt.preventDefault();
    closePhotoEditForm();
  }
}

function initPhotoUpload() {
  const file = fileUploadControl.files[0];
  const fileName = file.name.toLowerCase();

  const valid = AVAILABLE_FILE_TYPES.some((type) => fileName.endsWith(type));

  if (valid) {
    filePreview.src = URL.createObjectURL(file);
    effectPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
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
  const isLessThan20Symbols = tags.every((tag) => tag.length <= MAX_HASHTAG_LENGTH);
  if (!isLessThan20Symbols) {
    return `Максимальная длина хэш-тега - ${MAX_HASHTAG_LENGTH} символов, включая решетку`;
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
  (currentSymbolsAmount) => validateLength(currentSymbolsAmount, MAX_COMMENTS_LENGTH),
  `Комментарий должен содержать не более ${MAX_COMMENTS_LENGTH} символов, включая пробелы`
);

function onPhotoUpload() {
  openPhotoEditForm();
  initPhotoUpload();
}

function closePhotoEditForm() {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  editFormClose.removeEventListener('click', onCrossClick);
  pristine.reset();
  photoEditForm.reset();
  initScale(true);
  resetSlider();
}

function onCrossClick() {
  closePhotoEditForm();
}

function initUserFormSubmit() {
  photoEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);

      loadData(Route.SEND_DATA, Method.POST, formData)
        .then(() => {
          closePhotoEditForm();
          showSuccessMessage();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
}

initUserFormSubmit();
fileUploadControl.addEventListener('change', onPhotoUpload);


export {openPhotoEditForm, closePhotoEditForm};
