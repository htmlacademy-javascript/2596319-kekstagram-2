import {getPublications} from './publications.js';
import { createThumbnails } from './thumbnails.js';

createThumbnails(getPublications(25));
