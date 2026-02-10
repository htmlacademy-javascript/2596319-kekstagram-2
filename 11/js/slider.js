const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');

noUiSlider.create(slider, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

function updateEffect() {
  const value = slider.noUiSlider.get();
  sliderValue.value = value;
  const effect = effectsList.querySelector('.effects__radio:checked').value;

  const filters = {
    chrome: `grayscale(${value})`,
    sepia: `sepia(${value})`,
    marvin: `invert(${value}%)`,
    phobos: `blur(${value}px)`,
    heat: `brightness(${value})`,
    none: 'none'
  };

  imagePreview.style.filter = filters[effect] || 'none';
}

slider.noUiSlider.on('update', updateEffect);
sliderContainer.classList.add('hidden');

effectsList.addEventListener('change', (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    sliderContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
    return;
  }

  sliderContainer.classList.remove('hidden');

  const options = {
    chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
    sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
    marvin: { range: { min: 0, max: 100 }, start: 100, step: 1 },
    phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
    heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1 }
  };

  slider.noUiSlider.updateOptions(options[effect]);
});

export {updateEffect};
