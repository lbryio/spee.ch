
function setUserCookies(channelName, channelClaimId, shortChannelId) {
    setCookie('channel_name', channelName)
    setCookie('channel_claim_id', channelClaimId);
    setCookie('short_channel_id', shortChannelId);
}

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
    channelSelect.insertBefore(newChannelOption, channelSelect.firstChild);
}

function loginToChannel (event) {
    const userName = document.getElementById('channel-login-name-input').value;
    const password = document.getElementById('channel-login-password-input').value;
    const loginErrorDisplayElement = document.getElementById('login-error-display-element');
    // prevent default
    event.preventDefault()
    // send request
    sendAuthRequest(userName, password, '/login')
        // update session cookie with new channel name and id's
        .then(result => {
            setUserCookies(result.channelName, result.channelClaimId, result.shortChannelId); // replace the current cookies
            return result;
        })
        // update channel selection
        .then(result => {
            // remove old channel and replace with new one & select it
            replaceChannelOptionInPublishChannelSelect();
            // remove old channel and replace with new one & select it
            replaceChannelOptionInNavBarChannelSelect();
        })
        .catch(error => {
            showError(loginErrorDisplayElement, error);
            console.log('login failure:', error);
        })
}

