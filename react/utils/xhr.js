module.exports = {
  makeGetRequest (url) {
    return new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();
      xhttp.open('GET', url, true);
      xhttp.responseType = 'json';
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            resolve(xhttp.response);
          } if (xhttp.status === 401) {
            reject(new Error('Wrong username or password'));
          } else {
            reject(new Error(xhttp.response));
          }
        }
      };
      xhttp.send();
    });
  },
  makePostRequest (url, params) {
    return new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();
      xhttp.open('POST', url, true);
      xhttp.responseType = 'json';
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            resolve(xhttp.response);
          } if (xhttp.status === 401) {
            reject(new Error('Wrong username or password'));
          } else {
            reject(new Error(xhttp.response));
          }
        }
      };
      xhttp.send(params);
    });
  },
}
