# Spee.ch
Spee.ch is a web app that reads and publishes images and videos to and from the [LBRY](https://lbry.io/) blockchain.  You are encouraged to contribute to the shared code base, or fork it and make it your own.

You can create your own custom version of spee.ch by installing this code base and then creating your own custom components and styles to override the defaults.  (More details / guide on how to do that coming soon.)

## Quickstart

_note: this is the quickstart guide, for an in-depth step-by-step overview visit the [fullstart guide](https://github.com/lbryio/spee.ch/blob/readme-update/fullstart.md)._

#### Install System Dependencies:
  * [node](https://nodejs.org)
  * [MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
  * [`lbry`](https://github.com/lbryio/lbry) daemon
    * note: retrieve an address from the daemon and send your wallet a couple credits (or join us in the [#speech discord channel](https://discord.gg/YjYbwhS) and we will send you a few)
  * [FFmpeg](https://www.ffmpeg.org/download.html)
  
#### Clone this repo
```
$ git clone https://github.com/lbryio/spee.ch.git
```

####  Change directory into your project
```
$ cd spee.ch
```

#### Install node dependencies
```
$ npm install
```

#### Create the config files using the built-in CLI
```
$ npm run configure
```

#### Build & start the app

_note: make sure lbry is running in the background before proceeding_
```
$ npm run start
```

#### view in browser
 *  visit [http://localhost:3000](http://localhost:3000) in your browser
 
#### customize your app

check out the [customization guide](https://github.com/lbryio/spee.ch/blob/readme-update/customize.md) to change your app's appearance and components

#### (optional) add custom components and update the styles

  * create custom components by creating React components in `src/views/` (further instructions coming soon)
  * update the CSS by changing the files in `public/assets/css/` (further instructions and refactor coming soon) 

#### (optional) Syncing the full blockchain
 * Start the `spee.ch-sync` tool available at [billbitt/spee.ch-sync](https://github.com/billbitt/spee.ch-sync)
 * This is not necessary, but highly recommended.  It will decode the blocks of the `LBRY` blockchain and add the claims information to your database's tables

## API
#### /api/claim/publish

method: `POST`

example:
```
curl -F 'name=MyPictureName' -F 'file=@/path/to/myPicture.jpeg' https://spee.ch/api/claim/publish
```
Parameters:

  * `name` (required)
  * `file` (required) (must be type .mp4, .jpeg, .jpg, .gif, or .png)
  * `nsfw` (optional)
  * `license` (optional)
  * `title` (optional)
  * `description` (optional)
  * `thumbnail` url to thumbnail image, for .mp4 uploads only (optional)
  * `channelName` channel to publish too (optional)
  * `channelPassword` password for channel to publish too (optional, but required if `channelName` is provided)

response:
```
{
    "success": <bool>,
    "message": <string>,
    "data": {
        "name": <string>,
        "claimId": <string>,
        "url": <string>,
        "showUrl": <string>,
        "serveUrl": <string>,
        "lbryTx": {
            "claim_address": <string>,
            "claim_id": <string>,
            "fee": <number>,
            "nout": <number>,
            "tx": <string>,
            "value": <number>
        }
    }
}
```
   
#### /api/claim/availability/:name 
method: `GET`

example: 
```
curl https://spee.ch/api/claim/availability/doitlive
```
response:
```
{
    "success": <bool>,  // `true` if spee.ch succesfully checked the claim availability
    "data": <bool>, // `true` if claim is available, false if it is not available
    "message": <string> // human readable message of whether claim was available or not
}
```

## Contribute

### Stack
The spee.ch stack is MySQL, Express.js, Node.js, and React.js.  Spee.ch also runs `lbrynet` on its server, and it uses the `lbrynet` API to make requests -- such as `publish`, `create_channel`, and `get` -- on the `LBRY` network.
  
Spee.ch also runs a sync tool, which decodes blocks from the `LBRY` blockchain as they are mined, and stores the information in MySQL.  It stores all claims in the `Claims` table, and all channel claims in the `Certificates` table.

* server
  * [MySQL](https://www.mysql.com/)
  * [express](https://www.npmjs.com/package/express) 
  * [node](https://nodejs.org/)
  * [lbry](https://github.com/lbryio/lbry)
  * [FFmpeg](https://www.ffmpeg.org/)
* client
  * [react](https://reactjs.org/)
  * redux
  * sagas
  * scss
  * handlebars
 
 
### Architecture
* `cli/` contains the code for the CLI tool.  Running the tool will create `.json` config files and place them in the `config/` folder
  * `configure.js` is the entry point for the CLI tool
  * `cli/defaults/` holds default config files 
  * `cli/questions/` holds the questions that the CLI tool asks to build the config files

* `client/` contains all of the client code
  * The client side of spee.ch uses `React` and `Redux`
  * `client/src/index.js` is the entry point for the client side js.  It checks for preloaded state, creates the store, and places the `<App />` component in the document.
  * `client/src/app.js`  holds the `<App />` component, which contains the routes for `react-router-dom`
  * `client/src/` contains all of the JSX code for the app. When the app is built, the content of this folder is transpiled into the `client/build/` folder.
    * The Redux code is broken up into `actions/` `reducers/` and `selectors/`
    * The React components are broken up into `containers/` (components that pull props directly from the Redux store), `components/` ('dumb' components), and `pages/`
    * spee.ch also uses sagas which are in the `sagas/` folders and `channels/`
  * `client/scss/` contains  the CSS for the project
    * 
  
* `client_custom` is a folder which can be used to override the default components in `client/`
  * The folder structure mimics that of the `client/` folder
  * to customize spee.ch, place your own components and scss in the `client_custom/src/` and `client_custom/scss` folders. 
  
* `server/`  contains all of the server code
  * `index.js` is the entry point for the server.  It creates the [express app](https://expressjs.com/), requires the routes, syncs the database, and starts the server listening on the `PORT` designated in the config files.
  * `server/routes/` contains all of the routes for the express app
  * `server/controllers/` contains all of the controllers for all of the routes
  * `server/models/` contains all of the models which the app uses to interact with the `MySQL` database.  
    * Spee.ch uses the [sequelize](http://docs.sequelizejs.com/) ORM for communicating with the database.
   
* `tests/` holds the end-to-end tests for this project
  * Spee.ch uses `mocha` with the `chai` assertion library
  * unit tests are located inside the project in-line with the files being tested and are designated with a `xxxx.test.js` file name
 
### Tests
* This package uses `mocha` with `chai` for testing.
* Before running tests, create a `testingConfig.js` file in `devConfig/` by copying `testingConfig.example.js`   
* To run tests:
  *  To run all tests, including those that require LBC (like publishing), simply run `npm test`
  *  To run only tests that do not require LBC, run `npm run test:no-lbc`

### URL formats
Spee.ch has a few types of URL formats that return different assets from the LBRY network.  Below is a list of all possible URLs for the content on spee.ch
* retrieve the controlling `LBRY` claim:
  * https://spee.ch/`claim`
  * https://spee.ch/`claim`.`ext` (serve)
* retrieve a specific `LBRY` claim:
  * https://spee.ch/`claim_id`/`claim`
  * https://spee.ch/`claim_id`/`claim`.`ext` (serve)
* retrieve all contents for the controlling `LBRY` channel
  * https://spee.ch/`@channel`
* a specific `LBRY` channel
  * https://spee.ch/`@channel`:`channel_id`
* retrieve a specific claim within the controlling `LBRY` channel
  * https://spee.ch/`@channel`/`claim`
  * https://spee.ch/`@channel`/`claim`.`ext` (serve)
* retrieve a specific claim within a specific `LBRY` channel
  * https://spee.ch/`@channel`:`channel_id`/`claim`
  * https://spee.ch/`@channel`:`channel_id`/`claim`.`ext` (serve)
  
### Bugs
If you find a bug or experience a problem, please report your issue here on GitHub and find us in the lbry discord!

### Issue tags in this repo
#### level 1
Issues that anyone with basic web development can handle; little-to-no experience with the spee.ch codebase is required.

#### level 2 
Familiarity with web apps is required, but little-to-no familiarity with the lbry daemon is necessary

#### level 3
Familiarity with the spee.ch code base and how the lbry daemon functions is required

#### level 4
Issues with lbry (e.g. the spee.ch wallet, lbrynet configuration, etc.) that require strong familiarity with the lbry daemon and/or network to fix. Generally these issues are best suited for the `lbry` `protocol team` but are reported in this repo because they are part of the spee.ch implementation
