// validation function which checks the proposed file's type, size, and name
const validationFunctions = {
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
    isChannelNameAvailable: function (name) {
        return this.isNameAvailable(name, '/api/channel-is-available/');
    },
    isNameAvailable: function (name, apiUrl) {
        console.log('isNameAvailable?', name);
        const url = apiUrl + name;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .catch(error => {
                console.log('isNameAvailable error', error);
                throw error;
            })
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
    checkChannelName: function (name) {
        var successDisplayElement = document.getElementById('input-success-channel-name');
        var errorDisplayElement = document.getElementById('input-error-channel-name');
        var channelName = `@${name}`;
        var that = this;
        try {
            // check to make sure the characters are valid
            that.validateChannelName(channelName);
            // check to make sure it is available
            that.isChannelNameAvailable(channelName)
              .then(function(isAvailable){
                console.log('isChannelNameAvailable:', isAvailable);
                if (isAvailable) {
                  that.hideError(errorDisplayElement);
                  that.showSuccess(successDisplayElement)
                } else {
                  that.hideSuccess(successDisplayElement);
                  that.showError(errorDisplayElement, 'Sorry, that name is already taken');
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
            that.isChannelNameAvailable(channelName)
                .then(function(isAvailable) {
                    if (isAvailable) {
                        resolve();
                    } else {
                        reject(new ChannelNameError('Sorry, that name is already taken'));
                    }
                })
                .catch(function(error) {
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
