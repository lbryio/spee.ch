module.exports = function(app){
	// route for the home page
	app.get("/", function(req, res){
		res.status(200).render('index');
	});
	// a catch-all route if someone visits a page that does not exist
	app.use("*", function(req, res){
		res.status(404).render('fourOhFour');
	});
}
