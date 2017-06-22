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

function newCanvas(image){
	// hide start image
	img = image;
	// get dimensions of the start img
	canvasHeight = canvasWidth * (img.height / img.width);
	// size the canvas
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	// draw the meme
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
	y = 5;

	wrapText(ctx, text1, x, y, canvasWidth, fontSize, false);

	ctx.textBaseline = 'bottom';
	var text2 = bottomText.value;
	text2 = text2.toUpperCase();
	y = canvasHeight - 5;

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