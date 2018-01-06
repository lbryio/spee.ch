function loginToChannel (event) {
    const userName = document.getElementById('channel-login-name-input').value;
    const password = document.getElementById('channel-login-password-input').value;
    // prevent default
    event.preventDefault()
    validationFunctions.validateNewChannelLogin(userName, password)
        .then(() => {
            return sendAuthRequest(userName, password, '/login')
        })
        .then(result => {
            setUserCookies(result.channelName, result.channelClaimId, result.shortChannelId);
            // if user is on the home page, update the needed elements without reloading
            window.location = '/';
        })
        .catch(error => {
            const loginErrorDisplayElement = document.getElementById('login-error-display-element');
            if (error.name){
                validationFunctions.showError(loginErrorDisplayElement, error.message);
            } else {
                validationFunctions.showError(loginErrorDisplayElement, 'There was an error logging into your channel');
            }
        })
}
