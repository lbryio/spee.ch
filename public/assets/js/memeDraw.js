var canvas = document.getElementById('meme-canvas');
var img = document.getElementById('start-image');
var canvasWidth;
var canvasHeight;
var fontSize = 28;
var topText = document.getElementById('top-text');
var bottomText = document.getElementById('bottom-text');
var ctx = canvas.getContext('2d');
var claimNameInput = document.getElementById("file-name-input");

// create the canvas
img.onload = function() {
	// get dimensions of the start img
	canvasWidth = img.width;
	canvasHeight = img.height;
	// hide start image
	img.hidden = true;
	// size the canvas
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	// draw the starting meme
	drawMeme()
}

// if the text changes, re-draw the meme
topText.addEventListener('keyup', drawMeme);
bottomText.addEventListener('keyup', drawMeme);

// draw the image and draw the text over it
function drawMeme() {
	ctx.clearRect(0, 0,  canvasWidth, canvasHeight);
	ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
	ctx.lineWidth = 4;
	ctx.font = fontSize + 'px sans-serif';
	ctx.strokeStyle = 'black';
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'top';

	var text1 = topText.value;
	text1 = text1.toUpperCase();
	x = canvasWidth / 2;
	y = 0;

	wrapText(ctx, text1, x, y, canvasWidth, fontSize, false);

	ctx.textBaseline = 'bottom';
	var text2 = bottomText.value;
	text2 = text2.toUpperCase();
	y = canvasHeight;

	wrapText(ctx, text2, x, y, canvasHeight, fontSize, true);

}

function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {
	var pushMethod = (fromBottom)?'unshift':'push';

	lineHeight = (fromBottom)?-lineHeight:lineHeight;

	var lines = [];
	var y     = y;
	var line  ='';
	var words = text.split(' ');

	for (var i = 0; i < words.length; i++) {
		var testLine  = line + ' ' + words[i];
		var metrics   = context.measureText(testLine);
		var testWidth = metrics.width;

		if (testWidth > maxWidth) {
			lines[pushMethod](line);
			line = words[i] + ' ';
		} else {
			line = testLine;
		}
	}

	lines[pushMethod](line);

	for (var k in lines ) {
		context.strokeText(lines[k], x, y + lineHeight * k);
		context.fillText(lines[k], x, y + lineHeight * k);
	}
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

var claimName;

// save the meme
function startPublish() {
	//download the image 
    var dataUrl = canvas.toDataURL('image/jpeg');
	var blob = dataURItoBlob(dataUrl)
	claimName = claimNameInput.value;
	var fileName = claimNameInput.value + ".jpg";
	var file = new File([blob], fileName, {type: 'image/jpeg', lastModified: Date.now()});
	console.log(file);
	stageAndPublish(file);  // note: this function is in memePublish.js
};