const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const decreaseScaleButton = document.querySelector('.scale__control--smaller');
const increaseScaleButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

function resizeImage(step, enlarge) {
  const currentValue = parseInt(scaleValue.value, 10);

  if (enlarge) {
    const newValue = currentValue + step;

    if (newValue >= MIN_SCALE_VALUE && newValue <= MAX_SCALE_VALUE) {
      scaleValue.value = `${newValue}%`;
      imagePreview.style.transform = `scale(${newValue / 100})`;
    }
  } else {
    const newValue = currentValue - step;

    if (newValue >= MIN_SCALE_VALUE && newValue <= MAX_SCALE_VALUE) {
      scaleValue.value = `${newValue}%`;
      imagePreview.style.transform = `scale(${newValue / 100})`;
    }
  }
}

function onScaleIncreaseButtonClick() {
  resizeImage(SCALE_STEP, true);
}

function onScaleDecreaseButtonClick() {
  resizeImage(SCALE_STEP, false);
}

function initScale(reset) {
  if (reset) {
    scaleValue.value = `${MAX_SCALE_VALUE}%`;
    imagePreview.style.transform = 'scale(1)';
  } else {
    scaleValue.value = `${MAX_SCALE_VALUE}%`;
    imagePreview.style.transform = 'scale(1)';
    decreaseScaleButton.addEventListener('click', onScaleDecreaseButtonClick);
    increaseScaleButton.addEventListener('click', onScaleIncreaseButtonClick);
  }

}

initScale();

export {initScale};
