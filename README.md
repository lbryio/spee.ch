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

## bugs
If you find a bug or experience a problem, please report your issue here on github and find us in the lbry slack!
