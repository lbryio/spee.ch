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
	* example: `curl https://spee.ch/api/resolve/doitlive`
* /api/claim_list/:name
	* example: `curl https://spee.ch/api/claim_list/doitlive`
* /api/isClaimAvailable/:name (returns `true`/`false` for whether a name is available through spee.ch)
	* example: `curl https://spee.ch/api/isClaimAvailable/doitlive`

#### POST
* /api/publish
  * example: `curl -X POST -F 'name=MyPictureName' -F 'nsfw=false' -F 'file=@/path/to/my/picture.jpeg' https://spee.ch/api/publish`
  * Parameters:
    * name (string)
    * nsfw (boolean)
    * file (.mp4, .jpeg, .jpg, .gif, or .png)
    * license (string, optional)
    * title (string, optional)
    * description (string, optional)
    * thumbnail (string, optional) (for .mp4 uploads only)
    * channelName(string, optional)
    * channelPassword (string, optional)

## bugs
If you find a bug or experience a problem, please report your issue here on github and find us in the lbry slack!
