import {debounce} from './utils.js';

const MAX_RANDOM_PHOTOS = 10;
const DEBOUNCE_DELAY = 500;

const filters = document.querySelector('.img-filters');
const filterForm = filters.querySelector('.img-filters__form');

function showFilters() {
  filters.classList.remove('img-filters--inactive');
}

function clearPhotos() {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
}

function sortPhotos(photos, filterId) {
  switch (filterId) {
    case 'filter-random':
      return [...photos].sort(() => Math.random() - 0.5).slice(0, MAX_RANDOM_PHOTOS);
    case 'filter-discussed':
      return [...photos].sort((a, b) => b.comments.length - a.comments.length);
    default:
      return [...photos];
  }
}

function initFilters(data, callback) {
  showFilters();
  const debouncedCallback = debounce(callback, DEBOUNCE_DELAY);

  function onFilterButtonClick(evt) {
    const target = evt.target;

    if (!target.classList.contains('img-filters__button') ||
        target.classList.contains('img-filters__button--active')) {
      return;
    }

    filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');

    const filteredData = sortPhotos(data, target.id);
    clearPhotos();
    debouncedCallback(filteredData);
    console.log('a');
  }

  const filterButtonClickHandler = debouncedCallback(onFilterButtonClick);
  filterForm.addEventListener('click', onFilterButtonClick);
}
export {initFilters};
