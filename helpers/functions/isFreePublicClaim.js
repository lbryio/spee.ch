
module.exports = function(claim){
	console.log(">> isFreePublicClaim? claim:", claim);
	if (((claim.value.stream.metadata.license.indexOf("Public Domain") != -1 ) || (claim.value.stream.metadata.license.indexOf("Creative Commons") != -1 ))
		&& 
		(!claim.value.stream.metadata.fee || claim.value.stream.metadata.fee.amount === 0)) {
		return true;
	} else {
		return false;
	}
};