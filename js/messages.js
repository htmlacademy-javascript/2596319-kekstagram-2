const SHOW_TIME = 5000;

import { closePhotoEditForm } from './form.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

function closeMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onBodyClick);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeMessage();
  }
}

function onBodyClick(evt) {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  if (evt.target === messageElement) {
    closeMessage();
  }
}

function showMessage(template, buttonClass) {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);
  const button = messageElement.querySelector(buttonClass);
  button.addEventListener('click', () => {
    closeMessage();
  });
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onBodyClick);
  closePhotoEditForm();
}

function showDataErrorMessage(template) {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, SHOW_TIME);
}

function showSuccessMessage() {
  showMessage(successTemplate, '.success__button');
}

function showErrorMessage() {
  showMessage(errorTemplate, '.error__button');
}

function showGetDataErrorMessage() {
  showDataErrorMessage(dataErrorTemplate);
}

export {showSuccessMessage, showErrorMessage, showGetDataErrorMessage};
