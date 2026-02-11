import {getPublications} from './publications.js';
import { createThumbnails } from './thumbnails.js';
import './form.js';
import './slider.js';
import { initScale } from './scale.js';

initScale();
createThumbnails(getPublications(25));
