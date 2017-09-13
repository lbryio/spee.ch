# spee.ch
spee.ch is a single-serving site that reads and publishes images and videos to and from the [LBRY](https://lbry.io/) blockchain.

## how to run this repository locally
* start mysql
	* install mysql
	* create a database called `lbry`
	* save your connection `username` and `password` someplace handy
* start lbrynet daemon
	* install the [`lbry`](https://github.com/lbryio/lbry) daemon
	* start the `lbry` daemon
* start spee.ch-sync
	* install and run this [`speech-sync`](https://github.com/billbitt/spee.ch-sync) tool
* start spee.ch
	* clone this repo
	* run `npm install`
	* to start the server, from your command line run `node speech.js` while passing three environmental variables: 
		* (1) your lbry wallet address (`LBRY_CLAIM_ADDRESS`), 
		* (2) your mysql username (`MYSQL_USERNAME`),
		* (2) your mysql password (`MYSQL_PASSWORD`), 
		* (3) the environment to run (`NODE_ENV`).
		* i.e. `LBRY_CLAIM_ADDRESS=<your wallet address here> MYSQL_USERNAME=<username here> MYSQL_PASSWORD=<password here> NODE_ENV=development node speech.js`
		* e.g. `LBRY_CLAIM_ADDRESS=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX MYSQL_USERNAME="lbry" MYSQL_PASSWORD="xxxxxx" NODE_ENV=development node speech.js`
		* To run hot, use `nodemon` instead of `node`
* visit [localhost:3000](http://localhost:3000)

## API

#### GET
* /api/resolve/:name
	* a successfull request returns the resolve results for the claim at that name in JSON format
* /api/claim_list/:name
	* a successfull request returns a list of claims at that claim name in JSON format
* /api/isClaimAvailable/:name
	* a successfull request returns a boolean: `true` if the name is still available, `false` if the name has already been published to by spee.ch.

#### POST
* /api/publish
	* request parameters:
		* body (form-data):
			* name: string (optional)
				* defaults to the file's name, sans extension
				* names can only contain the following characters: `A-Z`, `a-z`, `_`, or `-`
			* license: string (optional)
				* defaults to "No License Provided"
				* only "Public Domain" or "Creative Commons" licenses are allowed
			* nsfw: string, number, or boolean (optional)
				* defaults `true`
				* nsfw can be a string ("on"/"off"), number (0 or 1), or boolean (`true`/`false`)
		* files:
			* the `files` object submitted must use "speech" or "null" as the key for the file's value object
	* a successfull request will return the transaction details resulting from your published claim in JSON format

## bugs
If you find a bug or experience a problem, please report your issue here on github and find us in the lbry slack!
