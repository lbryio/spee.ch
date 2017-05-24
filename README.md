# spee.ch (js)
this is a clone of spee.ch with a javascript backend

## how to use this repository
* start lbry
	* install the [`lbry`](https://github.com/lbryio/lbry) daemon
	* start the `lbry` daemon
* start RabbitMQ (this will handle the queue for background processing)
	* install & run [RabbitMQ](https://www.rabbitmq.com/#getstarted)
* clone this repo
* run `npm install`
* from your terminal, run `npm start`
	* to run hot, run `nodemon server.js`
* start at least one worker by running `node worker.js`
* visit [localhost:3000](http://localhost:3000) and enjoy!

## site navigation

* spee.ch.
	* To publish a file, navigate to the homepage.
* spee.ch/<the name of the claim>
	* To view the file with the largest bid at a claim.
	* E.g. spee.ch/doitlive.
* spee.ch/< the name of the claim >/< the claim_id >
	* To view a specific file at a claim
	* E.g. spee.ch/doitlive/c496c8c55ed79816fec39e36a78645aa4458edb5
* spee.ch/<the name of the claim>/all
	* To view a batch of files at a claim
	* E.g. spee.ch/doitlive/all

## development to-do's
* discover/explore functionality for home page
* display a list of claims at /:name/all
* fetching: a temporary page while the request is being made (with a loading bar?)
* publishing: a temporary page while the request is being handled by the server (with a loading bar?)
* publishing: after publishing, take the user to a temp page with the tx info and status of the tx (then redirect when the tx is complete)

## API

Note: these are being used for testing durring spee.ch development and may not be maintained

* A GET request to spee.ch/claim_list/<the name of the claim>
	* Will return the claim_list for the claim in json format.
	* E.g. spee.ch/claim_list/doitlive
