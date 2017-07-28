

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
			if (file.size > 10000000){
				throw new Error('Sorry, images are limited to 10 megabytes.');
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
// validation function that checks to make sure the claim name is not already claimed
function isNameAvailable (name) {
	var deferred = new Promise(function(resolve, reject) {
		// make sure the claim name is still available
		var xhttp;
		xhttp = new XMLHttpRequest();
		xhttp.open('GET', '/api/isClaimAvailable/' + name, true);
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
	return deferred;
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

function cleanseClaimName(name) {
	name = name.replace(/\s+/g, '-'); // replace spaces with dashes
	name = name.replace(/[^A-Za-z0-9-]/g, '');  // remove all characters that are not A-Z, a-z, 0-9, or '-'
	return name;
}
// validaiton function to check claim name as the input changes
function checkClaimName(name){
	try {
		// check to make sure the characters are valid
		validateClaimName(name);
		clearError('input-error-claim-name');
		// check to make sure it is availabe
		isNameAvailable(name)
			.then(function() {
				document.getElementById('claim-name-available').hidden = false;
			})
			.catch(function(error) {
				document.getElementById('claim-name-available').hidden = true;
				showError('input-error-claim-name', error.message);
			});
	} catch (error) {
		showError('input-error-claim-name', error.message);
		document.getElementById('claim-name-available').hidden = true;
	}
}
// validation function which checks all aspects of the publish submission
function validateSubmission(stagedFiles, name){
	var deferred = new Promise(function (resolve, reject) {
		// make sure only 1 file was selected
		if (!stagedFiles) {
			reject(new FileError("Please select a file"));
		} else if (stagedFiles.length > 1) {
			reject(new FileError("Only one file is allowed at a time"));
		}
		// validate the file's name, type, and size
		try {
			validateFile(stagedFiles[0]);
		} catch (error) {
			reject(error);
		}
		// make sure the claim name has not already been used
		try {
			validateClaimName(name);
		} catch (error) {
			reject(error);
		}
		isNameAvailable(name)
			.then(function() {
				resolve();
			})
			.catch(function(error) {
				reject(error);
			});
	});
	return deferred;
}