import {getPublications} from './publications.js';
import { createThumbnails } from './thumbnails.js';
import './form.js';
import './scale.js';
import './slider.js';

createThumbnails(getPublications(25));
