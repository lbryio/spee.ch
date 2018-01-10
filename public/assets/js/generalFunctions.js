function getRequest (url) {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 ) {
                if ( xhttp.status == 200) {
                    resolve(xhttp.response);
                } else if (xhttp.status == 403) {
                    reject('Wrong channel name or password');
                } else {
                    reject('request failed with status:' + xhttp.status);
                };
            }
        };
        xhttp.send();
    })
}

function postRequest (url, params) {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open('POST', url, true);
        xhttp.responseType = 'json';
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 ) {
                if ( xhttp.status == 200) {
                    resolve(xhttp.response);
                } else if (xhttp.status == 401) {
                    reject( new AuthenticationError('Wrong channel name or password'));
                } else {
                    reject('request failed with status:' + xhttp.status);
                };
            }
        };
        xhttp.send(params);
    })
}

function toggleSection(event){
	event.preventDefault();

	var dataSet = event.target.dataset;
	var status = dataSet.open;
	var masterElement = document.getElementById(event.target.id||event.srcElement.id);
	var slaveElement = document.getElementById(dataSet.slaveelementid);
	var closedLabel = dataSet.closedlabel;
	var openLabel = dataSet.openlabel;

	if (status === "false") {
		slaveElement.hidden = false;
		masterElement.innerText = openLabel;
		masterElement.dataset.open = "true";
	} else {
		slaveElement.hidden = true;
		masterElement.innerText = closedLabel;
		masterElement.dataset.open = "false";
	}
}

function createProgressBar(element, size){
	var x = 0;
	var adder = 1;
	// create the bar holder & place it
    var barHolder = document.createElement('p');
	for (var i = 0; i < size; i++) {
        const bar = document.createElement('span');
        bar.innerText = '| ';
        bar.setAttribute('class', 'progress-bar progress-bar--inactive');
        barHolder.appendChild(bar);
    }
    element.appendChild(barHolder);
	// get the bars
    const bars = document.getElementsByClassName('progress-bar');
    // function to update the bars' classes
	function updateOneBar(){
        // update the appropriate bar
        if (x > -1 && x < size){
            if (adder === 1){
                bars[x].setAttribute('class', 'progress-bar progress-bar--active');
            } else {
                bars[x].setAttribute('class', 'progress-bar progress-bar--inactive');
            }
        }
        // set x
        if (x === size){
            adder = -1;
        } else if ( x === -1){
            adder = 1;
        }
        // update the adder
        x += adder;

	};
	// start updater
	setInterval(updateOneBar, 300);
}

function setCookie(key, value) {
    document.cookie = `${key}=${value}`;
}

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    const channelName = getCookie("channel_name");
    if (channelName != "") {
        console.log(`cookie found for ${channelName}`);
    } else {
        console.log('no channel_name cookie found');
    }
}

function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;`;
}

function setUserCookies(channelName, shortChannelId, channelClaimId) {
    setCookie('channel_name', channelName)
    setCookie('channel_claim_id', channelClaimId);
    setCookie('short_channel_id', shortChannelId);
}

function clearUserCookies() {
    clearCookie('channel_name')
    clearCookie('channel_claim_id');
    clearCookie('short_channel_id');
}

function copyToClipboard(event){
    var elementToCopy = event.target.dataset.elementtocopy;
    var element = document.getElementById(elementToCopy);
    var errorElement = 'input-error-copy-text' + elementToCopy;
    element.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        validationFunctions.showError(errorElement, 'Oops, unable to copy');
    }
}

// Create new error objects, that prototypically inherit from the Error constructor
function FileError(message) {
  this.name = 'FileError';
  this.message = message || 'Default Message';
  this.stack = (new Error()).stack;
}
FileError.prototype = Object.create(Error.prototype);
FileError.prototype.constructor = FileError;

function NameError(message) {
  this.name = 'NameError';
  this.message = message || 'Default Message';
  this.stack = (new Error()).stack;
}
NameError.prototype = Object.create(Error.prototype);
NameError.prototype.constructor = NameError;

function ChannelNameError(message) {
    this.name = 'ChannelNameError';
    this.message = message || 'Default Message';
    this.stack = (new Error()).stack;
}
ChannelNameError.prototype = Object.create(Error.prototype);
ChannelNameError.prototype.constructor = ChannelNameError;

function ChannelPasswordError(message) {
    this.name = 'ChannelPasswordError';
    this.message = message || 'Default Message';
    this.stack = (new Error()).stack;
}
ChannelPasswordError.prototype = Object.create(Error.prototype);
ChannelPasswordError.prototype.constructor = ChannelPasswordError;

function AuthenticationError(message) {
    this.name = 'AuthenticationError';
    this.message = message || 'Default Message';
    this.stack = (new Error()).stack;
}
AuthenticationError.prototype = Object.create(Error.prototype);
AuthenticationError.prototype.constructor = AuthenticationError;

function showAssetDetails(event) {
    var thisAssetHolder = document.getElementById(event.target.id);
    var thisAssetImage = thisAssetHolder.firstElementChild;
    var thisAssetDetails = thisAssetHolder.lastElementChild;
    thisAssetImage.style.opacity = 0.2;
    thisAssetDetails.setAttribute('class', 'grid-item-details flex-container--column flex-container--center-center');
}

function hideAssetDetails(event) {
    var thisAssetHolder = document.getElementById(event.target.id);
    var thisAssetImage = thisAssetHolder.firstElementChild;
    var thisAssetDetails = thisAssetHolder.lastElementChild;
    thisAssetImage.style.opacity = 1;
    thisAssetDetails.setAttribute('class', 'hidden');
}
