# Spee.ch
Spee.ch is a web app that reads and publishes images and videos to and from the [LBRY](https://lbry.io/) blockchain.

## Installation
* start mysql
	* install mysql
	* create a database called `lbry`
	* save your connection `username` and `password` someplace handy
* start lbrynet daemon
	* install the [`lbry`](https://github.com/lbryio/lbry) daemon
	* start the `lbry` daemon
* start spee.ch
	* clone this repo
	* run `npm install`
	* create your own config files in `/config`
	  * copy `mysqlConfig.js.example`, name it `mysqlConfig.js`, and update its contents.
	  * copy `siteConfig.js.example`, name it `siteConfig.js`, and update its contents.
	* build the app by running `npm run build`
	  * for development, `npm run build-dev` will build the app and continue to listen for changes, building again when a change is made.
	* to start the server, run `npm run start`
	  * for development, `npm run start-dev` will start the server and continue to listen for changes, restarting the server again whenever a change is made. 
	  * for production, [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/) is a great tool for starting and managing node processes
* visit [localhost:3000](http://localhost:3000) and check out your spee.ch app!
* start spee.ch-sync (optional, recommended)
    * Note: this tool will decode blocks from the `lbry` blockchain and update the Claim and Certificate tables in mysql with all the claims from the blockchain.  This is not necessary if you only want to host and resolve content published through your version of spee.ch, but it is required if you want to retrieve and host other content from the lbry network.
    * install and run this [`speech-sync`](https://github.com/billbitt/spee.ch-sync) tool

## Development & App Structure
* the `client/` folder houses all of the `react` and `redux` code
  * `client.js` is the entry point for the react app
  * [react components](https://reactjs.org/docs/react-component.html) are located in `client/components`, `client/containers`, and `client/pages`
      * `/components` contains the 'dumb' components that receive props (if any) from their parents
      * `/containers` contains the 'smart' redux-connected components that receive props from the `redux-store`
      * `/pages` contains the components which act as the main pages of the app
  * actions are located in the `client/actions` folder
  * reducers are located in the `client/reducers` folder
  * sagas are located in the `client/sagas` folder 
* the `server/` folder contains all of server code
  * `server.js` is the entry point for the server.  It creates the [express app](https://expressjs.com/), requires the routes, syncs the database, and starts the server listening on the `PORT` designated in the config file. This file is the entry point for webpack to build the server bundle.
  * the `/routes` folder contains all of the routes for the express app
  * the `/models` folder contains all of the models which the app uses to interact with the `mysql` database.  Note: this app uses the [sequelize](http://docs.sequelizejs.com/) orm.
* webpack
  * During the build process, webpack creates two bundles for this project: 
    *  (1) a client-side app bundle which will be located at `public/bundle/bundle.js`
    *  (2) a server bundle which will be located at `index.js`
* configuration
  * the `config/` folder contains all of the required config files.  The project contains `.example` files which can be copied to create the necessary `.js` files
  * the `devConfig/` folder contains optional config files.  Updating these files is not necessary.  If you update these files, make sure to add them to your `.gitignore` file so they are not included in source control.

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
