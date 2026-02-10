const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const decreaseScaleButton = document.querySelector('.scale__control--smaller');
const increaseScaleButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

function increaseScale(step) {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = currentValue + step;

  if (newValue >= MIN_SCALE_VALUE && newValue <= MAX_SCALE_VALUE) {
    scaleValue.value = `${newValue}%`;
    imagePreview.style.transform = `scale(${newValue / 100})`;
  }
}

function decreaseScale(step) {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = currentValue - step;

  if (newValue >= MIN_SCALE_VALUE && newValue <= MAX_SCALE_VALUE) {
    scaleValue.value = `${newValue}%`;
    imagePreview.style.transform = `scale(${newValue / 100})`;
  }
}

function onScaleIncreaseButtonClick() {
  increaseScale(SCALE_STEP);
}

function onScaleDecreaseButtonClick() {
  decreaseScale(SCALE_STEP);
}

function initScale() {
  scaleValue.value = `${MAX_SCALE_VALUE}%`;
  imagePreview.style.transform = 'scale(1)';
  decreaseScaleButton.addEventListener('click', onScaleDecreaseButtonClick);
  increaseScaleButton.addEventListener('click', onScaleIncreaseButtonClick);
}

initScale();

export {initScale};
