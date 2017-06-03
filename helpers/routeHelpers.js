var path = require('path');

module.exports = {
	handleRequestError: function(error, res) {
		if ((error === "NO_CLAIMS") || (error === "NO_FREE_PUBLIC_CLAIMS")){
			res.status(307).sendFile(path.join(__dirname, '../public', 'noClaims.html'));
		} else if (error.response.status === 500) {
			res.status(400).send(error.response.data.error.message);
		} else {
			res.status(400).send(error.toString());
		};
	}
}
