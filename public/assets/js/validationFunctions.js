

// validation function which checks the proposed file's type, size, and name
function validateFile(file) {
	if (!file) {
		throw new Error('no file provided');
	}
	if (/'/.test(file.name)) {
		throw new Error('apostrophes are not allowed in the file name');
	}
	// validate size and type
	switch (file.type) {
		case 'image/jpeg':
		case 'image/jpg':
		case 'image/png':
		case 'image/gif':
			if (file.size > 50000000){
				throw new Error('Sorry, images are limited to 50 megabytes.');
			}
			break;
		case 'video/mp4':
			if (file.size > 50000000){
				throw new Error('Sorry, videos are limited to 50 megabytes.');
			}
			break;
		default:
			throw new Error(file.type + ' is not a supported file type. Only, .jpeg, .png, .gif, and .mp4 files are currently supported.')
	}
}
// validation function that checks to make sure the claim name is valid
function validateClaimName (name) {
	// ensure a name was entered
	if (name.length < 1) {
		throw new NameError("You must enter a name for your claim");
	}
	// validate the characters in the 'name' field
	const invalidCharacters = /[^A-Za-z0-9,-]/g.exec(name);
	if (invalidCharacters) {
		throw new NameError('"' + invalidCharacters + '" characters are not allowed in the title.');
	}
}

function validateChannelName (name) {
	name = name.substring(name.indexOf('@') + 1);
	console.log(name);
    // ensure a name was entered
    if (name.length < 1) {
        throw new ChannelNameError("You must enter a name for your channel");
    }
    // validate the characters in the 'name' field
    const invalidCharacters = /[^A-Za-z0-9,-,@]/g.exec(name);
    if (invalidCharacters) {
        throw new ChannelNameError('"' + invalidCharacters + '" characters are not allowed in the channel name.');
    }
}

function validatePassword (password) {
    if (password.length < 1) {
        throw new ChannelPasswordError("You must enter a password for you channel");
    }
}

function cleanseClaimName(name) {
	name = name.replace(/\s+/g, '-'); // replace spaces with dashes
	name = name.replace(/[^A-Za-z0-9-]/g, '');  // remove all characters that are not A-Z, a-z, 0-9, or '-'
	return name;
}

// validation functions to check claim & channel name eligibility as the inputs change

function isNameAvailable (name, apiUrl) {
    return new Promise(function(resolve, reject) {
        // make sure the claim name is still available
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.open('GET', apiUrl + name, true);
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 ) {
                if ( this.status == 200) {
                    if (this.response == true) {
                        resolve();
                    } else {
                        reject( new NameError("That name has already been claimed by another user.  Please choose a different name."));
                    }
                } else {
                    reject("request to check claim name failed with status:" + this.status);
                };
            }
        };
        xhttp.send();
    });
}

function showError(errorDisplay, errorMsg) {
    errorDisplay.hidden = false;
    errorDisplay.innerText = errorMsg;
}

function hideError(errorDisplay) {
    errorDisplay.hidden = true;
    errorDisplay.innerText = '';
}

function showSuccess (successElement) {
    successElement.hidden = false;
    successElement.innerHTML = "&#x2714";
}

function hideSuccess (successElement) {
    successElement.hidden = true;
    successElement.innerHTML = "";
}

function checkAvailability(name, successDisplayElement, errorDisplayElement, validateName, isNameAvailable, apiUrl) {
    try {
        // check to make sure the characters are valid
        validateName(name);
        // check to make sure it is available
        isNameAvailable(name, apiUrl)
            .then(function() {
                hideError(errorDisplayElement);
                showSuccess(successDisplayElement)
            })
            .catch(function(error) {
                hideSuccess(successDisplayElement);
                showError(errorDisplayElement, error.message);
            });
    } catch (error) {
        hideSuccess(successDisplayElement);
        showError(errorDisplayElement, error.message);
    }
}

function checkClaimName(name){
	const successDisplayElement = document.getElementById('input-success-claim-name');
	const errorDisplayElement = document.getElementById('input-error-claim-name');
	checkAvailability(name, successDisplayElement, errorDisplayElement, validateClaimName, isNameAvailable, '/api/isClaimAvailable/');
}

function checkChannelName(name){
    const successDisplayElement = document.getElementById('input-success-channel-name');
    const errorDisplayElement = document.getElementById('input-error-channel-name');
    name = `@${name}`;
    checkAvailability(name, successDisplayElement, errorDisplayElement, validateChannelName, isNameAvailable, '/api/isChannelAvailable/');
}

// validation function which checks all aspects of the publish submission
function validateFilePublishSubmission(stagedFiles, claimName, channelName){
	return new Promise(function (resolve, reject) {
		// 1. make sure only 1 file was selected
		if (!stagedFiles) {
			return reject(new FileError("Please select a file"));
		} else if (stagedFiles.length > 1) {
			return reject(new FileError("Only one file is allowed at a time"));
		}
		// 2. validate the file's name, type, and size
		try {
			validateFile(stagedFiles[0]);
		} catch (error) {
			return reject(error);
		}
		// 3. validate that a channel was chosen
		if (channelName === 'new') {
			return reject(new ChannelNameError("Please select a valid channel"));
        };
		// 4. validate the claim name
		try {
			validateClaimName(claimName);
		} catch (error) {
			return reject(error);
		}
		// if all validation passes, check availability of the name
		isNameAvailable(claimName, '/api/isClaimAvailable/')
			.then(() => {
				resolve();
			})
			.catch(error => {
				reject(error);
			});
	});
}

// validation function which checks all aspects of the publish submission
function validateNewChannelSubmission(channelName, password){
    return new Promise(function (resolve, reject) {
    	// 1. validate name
        try {
            validateChannelName(channelName);
        } catch (error) {
            return reject(error);
        }
        // 2. validate password
        try {
            validatePassword(password);
        } catch (error) {
            return reject(error);
        }
        // 3. if all validation passes, check availability of the name
        isNameAvailable(channelName, '/api/isChannelAvailable/')  // validate the availability
            .then(() => {
                console.log('channel is avaliable');
                resolve();
            })
            .catch( error => {
                console.log('error: channel is not avaliable');
                reject(error);
            });
    });
}