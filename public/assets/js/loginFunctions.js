function replaceChannelOptionInPublishChannelSelect() {
    // remove the old channel option
    const oldChannel = document.getElementById('publish-channel-select-channel-option')
    if (oldChannel){
        oldChannel.parentNode.removeChild(oldChannel);
    }
    // get channel details from cookies
    const loggedInChannel = getCookie('channel_name');
    // create new channel option
    const newChannelOption = document.createElement('option');
    newChannelOption.setAttribute('value', loggedInChannel);
    newChannelOption.setAttribute('id', 'publish-channel-select-channel-option');
    newChannelOption.setAttribute('selected', '');
    newChannelOption.innerText = loggedInChannel;
    // add the new option
    const channelSelect = document.getElementById('channel-name-select');
    channelSelect.insertBefore(newChannelOption, channelSelect.firstChild);
    // carry out channel selection
    toggleSelectedChannel(loggedInChannel);
}

function replaceChannelOptionInNavBarChannelSelect () {
    // remove the old channel option
    const oldChannel = document.getElementById('nav-bar-channel-select-channel-option');
    if (oldChannel){
        oldChannel.parentNode.removeChild(oldChannel);
    }
    // get channel details from cookies
    const loggedInChannel = getCookie('channel_name');
    // create new channel option & select it
    const newChannelOption = document.createElement('option');
    newChannelOption.setAttribute('value', loggedInChannel);
    newChannelOption.setAttribute('id', 'nav-bar-channel-select-channel-option');
    newChannelOption.setAttribute('selected', '');
    newChannelOption.innerText = loggedInChannel;
    // add the new option
    const channelSelect = document.getElementById('nav-bar-channel-select');
    channelSelect.style.display = 'inline-block';
    channelSelect.insertBefore(newChannelOption, channelSelect.firstChild);
    // hide login
    const navBarLoginLink = document.getElementById('nav-bar-login-link');
    navBarLoginLink.style.display = 'none';
}

function loginToChannel (event) {
    const userName = document.getElementById('channel-login-name-input').value;
    const password = document.getElementById('channel-login-password-input').value;
    // prevent default
    event.preventDefault()
    validateNewChannelLogin(userName, password)
        .then(() => {
            console.log('channel login in progress');
            // send request
            return sendAuthRequest(userName, password, '/login')
        })
        .then(result => {
            // update session cookie with new channel name and id's
            setUserCookies(result.channelName, result.channelClaimId, result.shortChannelId); // replace the current cookies
        })
        .then(() => {
            // update channel selection
            if (window.location.pathname === '/') {
                // remove old channel and replace with new one & select it
                replaceChannelOptionInPublishChannelSelect();
                // remove old channel and replace with new one & select it
                replaceChannelOptionInNavBarChannelSelect();
            } else {
                window.location = '/';
            }

        })
        .catch(error => {
            const loginErrorDisplayElement = document.getElementById('login-error-display-element');
            if (error.name){
                showError(loginErrorDisplayElement, error.message);
            } else {
                console.log('login failure:', error);
                showError(loginErrorDisplayElement, 'There was an error logging into your channel');
            }
        })
}
