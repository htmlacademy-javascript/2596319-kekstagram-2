import {getPublications} from './publications.js';
import { createThumbnails } from './thumbnails.js';
import './form.js';

createThumbnails(getPublications(25));
