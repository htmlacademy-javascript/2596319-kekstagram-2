import './form.js';
import './slider.js';
import { initScale } from './scale.js';
import { loadData } from './data.js';
import { initFilters } from './filter-thumbnails.js';
import { createThumbnails } from './thumbnails.js';
import { showGetDataErrorMessage } from './messages.js';

loadData().then((photos) => {
  try {
    createThumbnails(photos);
    initFilters(photos, createThumbnails);
  } catch {
    showGetDataErrorMessage();
  }
});

initScale();
