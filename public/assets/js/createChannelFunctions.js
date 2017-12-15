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
            setUserCookies(result.channelName, result.channelClaimId, result.shortChannelId);
            showChannelCreateDoneDisplay();
            // if user is on the home page, update the needed elements without reloading
            if (window.location.pathname === '/') {
                replaceChannelOptionInPublishChannelSelect(result.channelName);
                replaceChannelOptionInNavBarChannelSelect(result.channelName);
            // if user is not on home page, redirect to home page
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
                showChannelCreationError('Unfortunately, we encountered an error while creating your channel.  Please let us know in slack!');
            }
        })
}
