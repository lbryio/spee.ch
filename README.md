# Spee.ch

spee.ch is a node-based web server that uses a lbrynet daemon to interact with the lbry network.

##Installation

* start spee.ch
	* clone this repo
	* run `npm install`
	* create your `
	speechConfig.js` file
	  * copy `speechConfig.js.example` and name it `speechConfig.js`
	  * replace the `null` values in the config file with the appropriate values for your environment
	* build the app by running `npm run build-prod`
	* to start the server, run `npm run start`
* visit [localhost:3000](http://localhost:3000)
* start spee.ch-sync (optional, recommended)
    * Note: this tool will decode blocks from the `lbry` blockchain and update the Claim and Certificate tables in mysql with all the claims from the blockchain.  This is not necessary if you only want to host and resolve content published through your version of spee.ch, but it is required if you want to retrieve and host other content from the lbry network.
    * install and run this [`speech-sync`](https://github.com/billbitt/spee.ch-sync) tool

## Tests
* Spee.ch uses `mocha` with `chai` for testing.  
* To run all tests that do not require LBC, run `npm test -- --grep @usesLbc --invert`
* To run all tests, including those that require LBC (like publishing), simply run `npm test`

## API

#### GET
* /api/claim/resolve/:name/:claimId
  * example: `curl https://spee.ch/api/claim/resolve/doitlive/xyz`
* /api/claim/list/:name
  * example: `curl https://spee.ch/api/claim/list/doitlive`
* /api/claim/availability/:name
  * returns the name if it is available
  * example: `curl https://spee.ch/api/claim/availability/doitlive`
* /api/channel/availability/:name
  * returns the name if it is available
  * example: `curl https://spee.ch/api/channel/availability/@CoolChannel`

#### POST
* /api/claim/publish
  * example: `curl -F 'name=MyPictureName' -F 'file=@/path/to/myPicture.jpeg' https://spee.ch/api/claim/publish`
  * Parameters:
    * `name`
    * `file` (must be type .mp4, .jpeg, .jpg, .gif, or .png)
    * `nsfw` (optional)
    * `license` (optional)
    * `title` (optional)
    * `description` (optional)
    * `thumbnail` url to thumbnail image, for .mp4 uploads only (optional)
    * `channelName`(optional)
    * `channelPassword` (optional,; required if `channelName` is provided)

## Bugs
If you find a bug or experience a problem, please report your issue here on github and find us in the lbry discord!

## Contribute

### below is a guide to the issue tags in this repo
level 1 - issues with spee.ch that anyone with basic web development can handle, little-to-no experience with the spee.ch codebase is required.

level 2 - issues with spee.ch familiarity with the spee.ch codebase is required, but little-to-no familiarity with the lbry daemon is necessary

level 3 - issues with spee.ch strong familiarity with the spee.ch code base and how the lbry daemon functions is required

level 4 - issues with lbry (e.g. the spee.ch wallet, lbrynet configuration, etc.) that require strong familiarity with the lbry daemon and/or network to fix. Generally these issues are best suited for the lbry protocol team but are placed in this repo because of they are part of the spee.ch implementation

The spee.ch stack is MySQL, Express.js, Node.js, React.js.  Spee.ch runs lbrynet on its server, and spee.ch uses the lbrynet api to make requests such as `publish`, `create_channel`, and `get`.

spee.ch also runs a sync tool, which decodes the lbry blocks as they are mined and stores the claims in a mysql.  It stores all claims in the `Claims` table, and all channel claims in the `Certificates` table. 

