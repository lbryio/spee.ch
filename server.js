// load dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// set port
var PORT = 80;
// initialize express
var app = express();
// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));
// configure epress
app.use(bodyParser.json());  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// require in routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
// start server
app.listen(PORT, function() {
	console.log("Listening on PORT " + PORT);
});
