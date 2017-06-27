# spee.ch
spee.ch is a single-serving site that reads and publishes images to and from the [LBRY](https://lbry.io/) blockchain.

## how to run this repository locally
* start lbry
	* install the [`lbry`](https://github.com/lbryio/lbry) daemon (v0.13.1 or higher)
	* start the `lbry` daemon
* start mysql
	* install mysql
	* create a database called `lbry`
	* save your connection uri somewhere handy (you will need it when you start the server)
		* the uri should be in the form `mysql://user:pass@host:port/dbname`
* clone this repo
	* customize `config/develpment.json` by replacing the value of `Database.PublishUploadPath` with a string representing the local path where you want uploaded files to be stored.
* run `npm install`
* to start the server, from your command line run `node server.js` while passing three environmental variables: your lbry wallet address (`LBRY_WALLET_ADDRESS`), your mysql connection uri (`MYSQL_CONNECTION_STRING`), and the environment to run (`NODE_ENV`).
	* i.e. `LBRY_WALLET_ADDRESS=<your wallet address here> MYSQL_CONNECTION_STRING=<your connection uri here> NODE_ENV=development node server.js`
	* e.g. `LBRY_WALLET_ADDRESS=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX MYSQL_CONNECTION_STRING=mysql://root:XXXXXX@localhost:3306/lbry NODE_ENV=development node server.js`
	* To run hot, use `nodemon` instead of `node`
* visit [localhost:3000](http://localhost:3000)

## site navigation
* spee.ch
	* To publish a file, navigate to the homepage.
* spee.ch/< the name of the claim >
	* To view the file with the largest bid at a claim.
	* E.g. spee.ch/doitlive.
* spee.ch/< the name of the claim >/< the claim_id >
	* To view a specific file at a claim
	* E.g. spee.ch/doitlive/c496c8c55ed79816fec39e36a78645aa4458edb5
* spee.ch/< the name of the claim >/all
	* To view a batch of files at a claim
	* E.g. spee.ch/doitlive/all

## API

#### GET
* /api/resolve/:name
	* a successfull request returns the resolve results for the claim at that name in JSON format
* /api/claim_list/:name
	* a successfull request returns a list of claims at that claim name in JSON format

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
