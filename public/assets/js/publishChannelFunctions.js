function sendSignupRequest (channelName, password) {
    return new Promise(function(resolve, reject) {
        // make sure the claim name is still available
        let xhttp;
        const params = `username=${channelName}&password=${password}`;
        console.log(params);
        xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/api/signup', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 ) {
                if ( this.status == 200) {
                    if (this.response == true) {
                        resolve();
                    } else {
                        reject( new NameError("Your request could not be completed"));
                    }
                } else {
                    reject("createChannel request failed with status:" + this.status);
                };
            }
        };
        xhttp.send(params);
    });
}

function publishNewChannel (event) {
    const channelName = `@${document.getElementById('new-channel-name').value}`;
    const password = document.getElementById('new-channel-password').value;
    const channelNameErrorDisplayElement = document.getElementById('input-error-channel-name');
    const passwordErrorDisplayElement = document.getElementById('input-error-password');
    // prevent default so this script can handle submission
    event.preventDefault();
    // validate submission
    validateNewChannelSubmission(channelName, password)
        .then(() => {
            return sendSignupRequest(channelName, password) // post the request
        })
        .then(() => {
            console.log('success');
            document.getElementById('signup-form').innerHTML = '<p>Your channel has been successfully created! Redirecting you now...</p>';
            window.location.href = `/${channelName}`;
        })
        .catch(error => {
            if (error.name === 'ChannelNameError'){
                showError(channelNameErrorDisplayElement, error.message);
            } else if (error.name === 'ChannelPasswordError'){
                showError(passwordErrorDisplayElement, error.message);
            } else {
                console.log('failure:', error);
            }
        })


}