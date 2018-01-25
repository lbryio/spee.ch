function loginToChannel (event) {
    const username = document.getElementById('channel-login-name-input').value;
    const password = document.getElementById('channel-login-password-input').value;
    // prevent default
    event.preventDefault()
    validationFunctions.validateNewChannelLogin(username, password)
        .then(() => {
            return fetch('/login', {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: new Headers({
                  'Content-Type': 'application/json'
                }),
                credentials: 'include',
              })
              .then(function(response) {
                  console.log(response);
                  if (response.ok){
                    return response.json();
                  } else {
                    throw response;
                  }
              })
              .catch(function(error) {
                  throw error;
              })
        })
        .then(function({success, message}) {
            if (success) {
                window.location = '/';
            } else {
                throw new Error(message);
            }

        })
        .catch(error => {
            const loginErrorDisplayElement = document.getElementById('login-error-display-element');
            if (error.message){
                validationFunctions.showError(loginErrorDisplayElement, error.message);
            } else {
                validationFunctions.showError(loginErrorDisplayElement, 'There was an error logging into your channel');
            }
        })
}
