const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const loadData = (route = Route.GET_DATA, method = Method.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`error ${response.status}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err);
    });

export { loadData, Method, Route };
