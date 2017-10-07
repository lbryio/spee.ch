function getRequest (url) {
    console.log('making GET request to', url)
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 ) {
                if ( xhttp.status == 200) {
                    resolve(xhttp.response);
                } else if (xhttp.status == 401) {
                    reject('wrong username or password');
                } else {
                    reject('request failed with status:' + xhttp.status);
                };
            }
        };
        xhttp.send();
    })
}

function postRequest (url, params) {
    console.log('making POST request to', url)
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
                    reject('wrong username or password');
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
	var x = 1;
	var adder = 1;
	function addOne(){
		var bars = '<p>|';
		for (var i = 0; i < x; i++){ bars += ' | '; }
		bars += '</p>';
		element.innerHTML = bars;
		if (x === size){
			adder = -1;
		} else if ( x === 0){
			adder = 1;
		}
		x += adder;
	};
	setInterval(addOne, 300);
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