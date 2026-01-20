import {getPublications} from './publications.js';
import { createThumbnails } from './thumbnails.js';
import {openFullMode} from './fullthumbnails.js';

createThumbnails(getPublications(25));
