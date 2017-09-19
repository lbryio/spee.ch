function toggleSection(event){
	event.preventDefault();

	var dataSet = event.target.dataset;
	var status = dataSet.open;
	var masterElement = document.getElementById(event.target.id||event.srcElement.id);
	var slaveElement = document.getElementById(dataSet.slaveelementid);
	
	if (status === "false") {
		slaveElement.hidden = false;
		masterElement.innerText = "[close]";
		masterElement.dataset.open = "true";
	} else {
		slaveElement.hidden = true;
		masterElement.innerText = "[open]";
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

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
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