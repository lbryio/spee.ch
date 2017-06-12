# spee.ch
spee.ch is a single-serving site that reads and publishes images to and from the [LBRY](https://lbry.io/) blockchain.

## how to run this repository locally
* start lbry
	* install the [`lbry`](https://github.com/lbryio/lbry) daemon
	* start the `lbry` daemon
* clone this repo
* create a folder called `Uploads` in the same root directory where you cloned the repo
* run `npm install`
* from your terminal, run `npm start`
	* to run hot, run `nodemon server.js`
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
