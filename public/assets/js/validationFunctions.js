// validation function which checks the proposed file's type, size, and name
const validationFunctions = {
    validateFile: function (file) {
        if (!file) {
            console.log('no file found');
            throw new Error('no file provided');
        }
        if (/'/.test(file.name)) {
            console.log('file name had apostrophe in it');
            throw new Error('apostrophes are not allowed in the file name');
        }
        // validate size and type
        switch (file.type) {
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/png':
                if (file.size > 10000000) {
                    console.log('file was too big');
                    throw new Error('Sorry, images are limited to 10 megabytes.');
                }
                break;
            case 'image/gif':
                if (file.size > 50000000) {
                    console.log('file was too big');
                    throw new Error('Sorry, .gifs are limited to 50 megabytes.');
                }
                break;
            case 'video/mp4':
                if (file.size > 50000000) {
                    console.log('file was too big');
                    throw new Error('Sorry, videos are limited to 50 megabytes.');
                }
                break;
            default:
                console.log('file type is not supported');
                throw new Error(file.type + ' is not a supported file type. Only, .jpeg, .png, .gif, and .mp4 files are currently supported.')
        }
    },
    // validation function that checks to make sure the claim name is valid
    validateClaimName: function (name) {
        // ensure a name was entered
        if (name.length < 1) {
            throw new NameError("You must enter a name for your url");
        }
        // validate the characters in the 'name' field
        const invalidCharacters = /[^A-Za-z0-9,-]/g.exec(name);
        if (invalidCharacters) {
            throw new NameError('"' + invalidCharacters + '" characters are not allowed');
        }
    },
    validateChannelName: function (name) {
        name = name.substring(name.indexOf('@') + 1);
        // ensure a name was entered
        if (name.length < 1) {
            throw new ChannelNameError("You must enter a name for your channel");
        }
        // validate the characters in the 'name' field
        const invalidCharacters = /[^A-Za-z0-9,-,@]/g.exec(name);
        if (invalidCharacters) {
            throw new ChannelNameError('"' + invalidCharacters + '" characters are not allowed');
        }
    },
    validatePassword: function (password) {
        if (password.length < 1) {
            throw new ChannelPasswordError("You must enter a password for you channel");
        }
    },
    // validation functions to check claim & channel name eligibility as the inputs change
    isNameAvailable: function (name, apiUrl) {
        const url = apiUrl + name;
        return getRequest(url)
    },
    showError: function (errorDisplay, errorMsg) {
        errorDisplay.hidden = false;
        errorDisplay.innerText = errorMsg;
    },
    hideError: function (errorDisplay) {
        errorDisplay.hidden = true;
        errorDisplay.innerText = '';
    },
    showSuccess: function (successElement) {
        successElement.hidden = false;
        successElement.innerHTML = "&#x2714";
    },
    hideSuccess: function (successElement) {
        successElement.hidden = true;
        successElement.innerHTML = "";
    },
    checkAvailability: function (name, successDisplayElement, errorDisplayElement, validateName, errorMessage, apiUrl) {
        var that = this;
        try {
            // check to make sure the characters are valid
            validateName(name);
            // check to make sure it is available
            that.isNameAvailable(name, apiUrl)
                .then(function (result) {
                    if (result === true) {
                        that.hideError(errorDisplayElement);
                        that.showSuccess(successDisplayElement)
                    } else {
                        that.hideSuccess(successDisplayElement);
                        that.showError(errorDisplayElement, errorMessage);
                    }
                })
                .catch(error => {
                    that.hideSuccess(successDisplayElement);
                    that.showError(errorDisplayElement, error.message);
                });
        } catch (error) {
            that.hideSuccess(successDisplayElement);
            that.showError(errorDisplayElement, error.message);
        }
    },
    checkChannelName: function (name) {
        const successDisplayElement = document.getElementById('input-success-channel-name');
        const errorDisplayElement = document.getElementById('input-error-channel-name');
        name = `@${name}`;
        this.checkAvailability(name, successDisplayElement, errorDisplayElement, this.validateChannelName, 'Sorry, that name is already taken', '/api/channel-is-available/');
    },
    // validation function which checks all aspects of the publish submission
    validateFilePublishSubmission: function (stagedFiles, metadata) {
        const channelName = metadata.channelName;
        const claimName = metadata.name;
        var that = this;
        return new Promise(function (resolve, reject) {
            // 1. make sure 1 file was staged
            if (!stagedFiles) {
                reject(new FileError("Please select a file"));
                return;
            } else if (stagedFiles.length > 1) {
                reject(new FileError("Only one file is allowed at a time"));
                return;
            }
            // 2. validate the file's name, type, and size
            try {
                that.validateFile(stagedFiles[0]);
            } catch (error) {
                reject(error);
                return;
            }
            // 3. validate that a channel was chosen
            if (channelName === 'new' || channelName === 'login') {
                reject(new ChannelNameError("Please log in to a channel"));
                return;
            }
            ;
            // 4. validate the claim name
            try {
                that.validateClaimName(claimName);
            } catch (error) {
                reject(error);
                return;
            }
            // if all validation passes, check availability of the name (note: do we need to re-validate channel name vs. credentials as well?)
            return that.isNameAvailable(claimName, '/api/claim-is-available/')
                .then(result => {
                    if (result) {
                        resolve();
                    } else {
                        reject(new NameError('Sorry, that ending is already taken'));
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // validation function which checks all aspects of a new channel submission
    validateNewChannelSubmission: function (userName, password) {
        const channelName = `@${userName}`;
        var that = this;
        return new Promise(function (resolve, reject) {
            // 1. validate name
            try {
                that.validateChannelName(channelName);
            } catch (error) {
                return reject(error);
            }
            // 2. validate password
            try {
                that.validatePassword(password);
            } catch (error) {
                return reject(error);
            }
            // 3. if all validation passes, check availability of the name
            that.isNameAvailable(channelName, '/api/channel-is-available/')  // validate the availability
                .then(function(result) {
                    if (result) {
                        resolve();
                    } else {
                        reject(new ChannelNameError('Sorry, that name is already taken'));
                    }
                })
                .catch(function(error) {
                    console.log('error evaluating channel name availability', error);
                    reject(error);
                });
        });
    },
    // validation function which checks all aspects of a new channel login
    validateNewChannelLogin: function (userName, password) {
        const channelName = `@${userName}`;
        var that = this;
        return new Promise(function (resolve, reject) {
            // 1. validate name
            try {
                that.validateChannelName(channelName);
            } catch (error) {
                return reject(error);
            }
            // 2. validate password
            try {
                that.validatePassword(password);
            } catch (error) {
                return reject(error);
            }
            resolve();
        });
    }
};
