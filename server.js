// load dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var siofu = require("socketio-file-upload");
var expressHandlebars = require("express-handlebars");
var ua = require('universal-analytics');
var config = require('config');

var googleAnalyticsId = config.get('AnalyticsConfig.googleId');
var visitor = ua(googleAnalyticsId, {https: true});

// set port
var PORT = 3000;

// initialize express app
var app = express();

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// configure express app
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(siofu.router);

// configure handlebars
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// require express routes
require("./routes/api-routes.js")(app, visitor);
require("./routes/html-routes.js")(app, visitor);

// wrap the server in socket.io to intercept incoming sockets requests
var http = require("./routes/sockets-routes.js")(app, visitor);

// start server
http.listen(PORT, function() {
	console.log("Listening on PORT " + PORT);
});
