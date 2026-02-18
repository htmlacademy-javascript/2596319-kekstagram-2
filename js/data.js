import { createThumbnails } from './thumbnails.js';
import { showGetDataErrorMessage } from './messages.js';
const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

function loadData(route, method = Method.GET, body = null) {
  return fetch(`${SERVER_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`error ${response.status}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err);
    });
}

async function addThumbnails() {
  try {
    const photos = await loadData(Route.GET_DATA);
    createThumbnails(photos);
  } catch {
    showGetDataErrorMessage();
  }
}

export { addThumbnails, loadData, Method, Route };
