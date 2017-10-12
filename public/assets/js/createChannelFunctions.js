function showChannelCreateInProgressDisplay () {
    const publishChannelForm = document.getElementById('publish-channel-form');
    publishChannelForm.hidden = true;
    const inProgress = document.getElementById('channel-publish-in-progress');
    inProgress.hidden = false;
    createProgressBar(document.getElementById('create-channel-progress-bar'), 12);
}

function showChannelCreateDoneDisplay() {
    const inProgress = document.getElementById('channel-publish-in-progress');
    inProgress.hidden=true;
    const done = document.getElementById('channel-publish-done');
    done.hidden = false;
}

function publishNewChannel (event) {
    const userName = document.getElementById('new-channel-name').value;
    const password = document.getElementById('new-channel-password').value;
    // prevent default so this script can handle submission
    event.preventDefault();
    // validate submission
    validateNewChannelSubmission(userName, password)
        .then(() => {
            console.log('new channel creation is in progress');
            showChannelCreateInProgressDisplay();
            return sendAuthRequest(userName, password, '/signup') // post the request
        })
        .then(result => {
            console.log('new channel successfully created', result);
            showChannelCreateDoneDisplay();
            // refresh window logged in as the channel
            setUserCookies(result.channelName, result.channelClaimId, result.shortChannelId); // set cookies
        })
        .then(() => {
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
            if (error.name === 'ChannelNameError' || error.name === 'ChannelPasswordError'){
                const channelNameErrorDisplayElement = document.getElementById('input-error-channel-name');
                showError(channelNameErrorDisplayElement, error.message);
            } else {
                console.log('signup failure:', error);
            }
        })
}