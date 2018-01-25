// display the content that shows channel creation has started
function showChannelCreateInProgressDisplay () {
    const publishChannelForm = document.getElementById('publish-channel-form');
    const inProgress = document.getElementById('channel-publish-in-progress');
    publishChannelForm.hidden = true;
    inProgress.hidden = false;
}

// display the content that shows channel creation is done
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
    const username = document.getElementById('new-channel-name').value;
    const password = document.getElementById('new-channel-password').value;
    // prevent default so this script can handle submission
    event.preventDefault();
    // validate submission
    validationFunctions.validateNewChannelSubmission(username, password)
        .then(() => {
            showChannelCreateInProgressDisplay();
            // return sendAuthRequest(userName, password, '/signup') // post the request
            return fetch('/signup', {
                  method: 'POST',
                  body: JSON.stringify({username, password}),
                  headers: new Headers({
                    'Content-Type': 'application/json'
                  }),
                  credentials: 'include',
              })
              .then(function(response) {
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
        .then(signupResult => {
            console.log('signup success:', signupResult);
            showChannelCreateDoneDisplay();
            window.location = '/';
        })
        .catch(error => {
            if (error.name === 'ChannelNameError' || error.name === 'ChannelPasswordError'){
                const channelNameErrorDisplayElement = document.getElementById('input-error-channel-name');
                validationFunctions.showError(channelNameErrorDisplayElement, error.message);
            } else {
                console.log('signup failure:', error);
                showChannelCreationError('Unfortunately, we encountered an error while creating your channel.  Please let us know in slack!', error);
            }
        })
}
