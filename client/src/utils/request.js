import 'cross-fetch/polyfill';

function parseJSON (response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus (response, jsonResponse) {
  if (response.status >= 200 && response.status < 300) {
    return jsonResponse;
  }
  const error = new Error(jsonResponse.message);
  error.response = response;
  throw error;
}

export default function request (url, options) {
  return fetch(url, options)
    .then(response => {
      return Promise.all([response, parseJSON(response)]);
    })
    .then(([response, jsonResponse]) => {
      return checkStatus(response, jsonResponse);
    });
}
