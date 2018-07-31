# Spee.ch
This repo packages the spee.ch server for use with spee.ch implementations.

### Quick start

Install dependencies
```
npm install
```
create config file
```
npm run configure
```
build from source code
```
npm run transpile
```
create client bundle with webpack
```
npm run bundle
```
start the sever
```
npm run start
```

### System dependencies
Spee.ch relies on the following programs being installed on your server:
* [imagemagick](https://www.imagemagick.org/script/download.php)
* [ffmpeg](https://www.ffmpeg.org/download.html)

## Development 
* the `server/` folder contains all of the server code
  * `index.js` is the entry point for the server.  It creates the [express app](https://expressjs.com/), requires the routes, syncs the database, and starts the server listening on the `PORT` designated in the config file.
  * the `server/routes` folder contains all of the routes for the express app
  * the `server/models` folder contains all of the models which the app uses to interact with the `mysql` database.  Note: this app uses the [sequelize](http://docs.sequelizejs.com/) ORM.
* the `client/` folder contains all of the client code

## Tests
* This package uses `mocha` with `chai` for testing.
* Before running tests, create a `testingConfig.js` file in `devConfig/` by copying `testingConfig.example.js`   
* To run tests:
  *  To run all tests, including those that require LBC (like publishing), simply run `npm test`
  *  To run only tests that do not require LBC, run `npm run test:no-lbc`

## API
* _(post)_ /api/claim/publish
  * example: `curl -F 'name=MyPictureName' -F 'file=@/path/to/myPicture.jpeg' https://spee.ch/api/claim/publish`
  * Parameters:
    * `name` (required)
    * `file` (required) (must be type .mp4, .jpeg, .jpg, .gif, or .png)
    * `nsfw` (optional)
    * `license` (optional)
    * `title` (optional)
    * `description` (optional)
    * `thumbnail` url to thumbnail image, for .mp4 uploads only (optional)
    * `channelName`(optional)
    * `channelPassword` (optional,; required if `channelName` is provided)
* _(get)_ /api/claim/resolve/:name/:claimId
  * example: `curl https://spee.ch/api/claim/resolve/doitlive/xyz`
* _(get)_ /api/claim/list/:name
  * example: `curl https://spee.ch/api/claim/list/doitlive`
* _(get)_ /api/claim/availability/:name
  * returns the name if it is available
  * example: `curl https://spee.ch/api/claim/availability/doitlive`
* _(get)_ /api/channel/availability/:name
  * returns the name if it is available
  * example: `curl https://spee.ch/api/channel/availability/@CoolChannel`

## Bugs
If you find a bug or experience a problem, please report your issue here on github and find us in the lbry discord!

## Contribute

### Below is a guide to the issue tags in this repo
#### level 1
Issues with spee.ch that anyone with basic web development can handle, little-to-no experience with the spee.ch codebase is required.

#### level 2 
Issues with spee.ch familiarity with the spee.ch codebase is required, but little-to-no familiarity with the lbry daemon is necessary

#### level 3
Issues with spee.ch strong familiarity with the spee.ch code base and how the lbry daemon functions is required

#### level 4
Issues with lbry (e.g. the spee.ch wallet, lbrynet configuration, etc.) that require strong familiarity with the lbry daemon and/or network to fix. Generally these issues are best suited for the lbry protocol team but are placed in this repo because of they are part of the spee.ch implementation

### Stack
* server
  * [mysql](https://www.mysql.com/)
  * [express](https://www.npmjs.com/package/express) 
  * [node](https://nodejs.org/)
  * [lbry](https://github.com/lbryio/lbry)
  * [imagemagick](https://www.imagemagick.org/)
  * [ffmpeg](https://www.ffmpeg.org/)
* client
  * [react](https://reactjs.org/)

### URL formats
Below is a list of all possible urls for the content on spee.ch
* controlling, free `LBRY` claim
  * spee.ch/claim (show)
  * spee.ch/claim.ext (serve)
* specific `LBRY` claim
  * spee.ch/claim_id/claim
  * spee.ch/claim_id/claim.ext
* all free contents for the controlling `LBRY` channel
  * spee.ch/@channel
* a specific `LBRY` channel
  * spee.ch/@channel:channel_id
* a specific claim within the controlling `LBRY` channel
  * spee.ch/@channel/claim (show)
  * spee.ch/@channel/claim.ext (serve)
* a specific claim within a specific `LBRY` channel
  * spee.ch/@channel:channel_id/claim
  * spee.ch/@channel:channel_id/claim.ext
