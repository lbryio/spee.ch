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

## development road map (to do's)
* discover/explore functionality for home page
* display a list of claims at /:name/all
* fetching: a temporary page while the request is being made (with a loading bar?)
* eslint with style guidelines
* implement a design for the front end

## API

Note: these are being used for testing durring spee.ch development and may not be maintained

* A GET request to spee.ch/claim_list/< the name of the claim >
	* Will return the claim_list for the claim in json format.
	* E.g. spee.ch/claim_list/doitlive
