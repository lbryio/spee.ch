# Spee.ch
This repo packages the spee.ch server for use with spee.ch implementations.

## Installation
visit [lbryio/www.spee.ch](https://github.com/lbryio/www.spee.ch) to get started

## Development / Structure 
* the `server/` folder contains all of the server code
  * `index.js` is the entry point for the server.  It creates the [express app](https://expressjs.com/), requires the routes, syncs the database, and starts the server listening on the `PORT` designated in the config file. This file is the entry point for webpack to build the server bundle.
  * the `server/routes` folder contains all of the routes for the express app
  * the `server/models` folder contains all of the models which the app uses to interact with the `mysql` database.  Note: this app uses the [sequelize](http://docs.sequelizejs.com/) ORM.
* webpack
  * During the build process, webpack creates a bundle for this project at `index.js`: 

## Tests
* This package uses `mocha` with `chai` for testing.  
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
    * `name` (required)
    * `file` (required) (must be type .mp4, .jpeg, .jpg, .gif, or .png)
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
The spee.ch stack is MySQL, Express.js, Node.js, React.js.  Spee.ch runs lbrynet on its server, and spee.ch uses the lbrynet api to make requests such as `publish`, `create_channel`, and `get`.

spee.ch also runs a sync tool, which decodes the `LBRY` blocks as they are mined and stores the claims in mysql.  It stores all claims in the `Claims` table, and all channel claims in the `Certificates` table. 
