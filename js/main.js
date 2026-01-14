import {getPublications} from './publications.js';
import { createThumbnail } from './thumbnails.js';

console.table(getPublications(25));
console.log(createThumbnail(getPublications()));
