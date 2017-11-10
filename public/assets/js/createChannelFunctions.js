// display the content that shows channel creation has started
function showChannelCreateInProgressDisplay () {
    const publishChannelForm = document.getElementById('publish-channel-form');
    const inProgress = document.getElementById('channel-publish-in-progress');
    const channelProgressBar = document.getElementById('create-channel-progress-bar');
    publishChannelForm.hidden = true;
    inProgress.hidden = false;
    createProgressBar(channelProgressBar, 12);
}

// display the content that shows channle creation is done
function showChannelCreateDoneDisplay() {
    const inProgress = document.getElementById('channel-publish-in-progress');
    inProgress.hidden=true;
    const done = document.getElementById('channel-publish-done');
    done.hidden = false;
}

function showChannelCreationError(msg) {
    const inProgress = document.getElementById('channel-publish-in-progress');
    inProgress.innerText = msg;
}

function publishNewChannel (event) {
    const userName = document.getElementById('new-channel-name').value;
    const password = document.getElementById('new-channel-password').value;
    // prevent default so this script can handle submission
    event.preventDefault();
    // validate submission
    validationFunctions.validateNewChannelSubmission(userName, password)
        .then(() => {
            showChannelCreateInProgressDisplay();
            return sendAuthRequest(userName, password, '/signup') // post the request
        })
        .then(result => {
            showChannelCreateDoneDisplay();
            // refresh window logged in as the channel
            setUserCookies(result.channelName, result.channelClaimId, result.shortChannelId); // set cookies
        })
        .then(() => {
            if (window.location.pathname === '/') {
                // remove old channel and replace with new one & select it
                replaceChannelOptionInPublishChannelSelect();
                replaceChannelOptionInNavBarChannelSelect();
            } else {
                window.location = '/';
            }
        })
        .catch(error => {
            if (error.name === 'ChannelNameError' || error.name === 'ChannelPasswordError'){
                const channelNameErrorDisplayElement = document.getElementById('input-error-channel-name');
                validationFunctions.showError(channelNameErrorDisplayElement, error.message);
            } else {
                console.log('signup failure:', error);
                showChannelCreationError('Unfortunately, Spee.ch encountered an error while creating your channel.  Please let us know in slack!');
            }
        })
}