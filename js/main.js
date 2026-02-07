import {getPublications} from './publications.js';
import { createThumbnails } from './thumbnails.js';
import './form.js';
import './scale.js';

createThumbnails(getPublications(25));
