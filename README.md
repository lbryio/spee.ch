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
	* create your `speechConfig.js` file
	  * copy `speechConfig.js.example` and name it `speechConfig.js`
	  * replace the `null` values in the config file with the appropriate values for your environement
	* to start the server, from your command line run `node speech.js`
		* To run hot, use `nodemon` instead of `node`
* visit [localhost:3000](http://localhost:3000)

## API

#### GET
* /api/resolve/:name
	* example: `curl https://spee.ch/api/resolve/doitlive`
* /api/claim-list/:name
	* example: `curl https://spee.ch/api/claim-list/doitlive`
* /api/is-claim-available/:name (returns `true`/`false` for whether a name is available through spee.ch)
	* example: `curl https://spee.ch/api/is-claim-available/doitlive`

#### POST
* /api/publish
  * example: `curl -X POST -F 'name=MyPictureName' -F 'file=@/path/to/myPicture.jpeg' https://spee.ch/api/publish`
  * Parameters:
    * `name`
    * `file` (.mp4, .jpeg, .jpg, .gif, or .png)
    * `nsfw` (optional)
    * `license` (optional)
    * `title` (optional)
    * `description` (optional)
    * `thumbnail` url to thumbnail image, for .mp4 uploads only (optional)
    * `channelName`(optional)
    * `channelPassword` (optional,; required if `channelName` is provided)

## bugs
If you find a bug or experience a problem, please report your issue here on github and find us in the lbry slack!
