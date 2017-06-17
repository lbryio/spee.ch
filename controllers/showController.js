var getAllFreePublicClaims = require("../helpers/functions/getAllFreePublicClaims.js");

module.exports = {
	getAllClaims: function(claimName){
		return getAllFreePublicClaims(claimName);  // to-do: does this need to be returned?
	}
}