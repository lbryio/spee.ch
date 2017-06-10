var path = require('path');

module.exports = {
	handleRequestError: function(error, res) {
		if ((error === "NO_CLAIMS") || (error === "NO_FREE_PUBLIC_CLAIMS")){
			res.status(307).render('noClaims');
		} else if (error.response){
			res.status(error.response.status).send(error.response.data.error.message);
		} else if (error.code === "ECONNREFUSED") {
			res.status(400).send("Connection refused.  The daemon may not be running.");
		} else {
			res.status(400).send(error.toString());
		};
	}
}
