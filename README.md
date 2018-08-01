# Spee.ch
Spee.ch is a web app that reads and publishes images and videos to and from the [LBRY](https://lbry.io/) blockchain.  You are encouraged to contribute to the shared code base, or fork it and make it your own.

You can create your own custom version of spee.ch by installing this code base and then creating your own custom components and styles to override the defaults.  (More details / guide on how to do that coming soon.)

## Quick start

### Prepare your environment
Install Node
  * [link](https://nodejs.org)

Start MySQL
  * install [mysql](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
  * create a database
  * save the `database`, `username`, and `password` someplace handy
  
Start LBRY
  * install the [`lbry`](https://github.com/lbryio/lbry) daemon
  * start the `lbry` daemon
  * retrieve an address from the daemon and send your wallet a couple credits (or join us in the [#speech discord channel](https://discord.gg/YjYbwhS) and we will send you a few)
  
Install ffmpeg
  * [link](https://www.ffmpeg.org/download.html)
  
Clone this repo
```
$ git clone https://github.com/lbryio/spee.ch.git
```

### Build and Start the App

Change directory into your project
```
$ cd spee.ch
```

Install node dependencies
```
$ npm install
```

create config file
```
$ npm run configure
```
build from source code
```
$ npm run transpile
```
create client bundle with webpack
```
$ npm run bundle
```
start the sever
```
$ npm run start
```

### View in browser
visit [localhost:3000](http://localhost:3000) in your browser

### (optional) add custom components and update the styles

  * create custom components by creating React components in `src/views/` (further instructions coming soon)
  * update the css by changing the files in `public/assets/css/` (further instructions and refactor coming soon) 

### (optional) Syncing the full blockchain
Start the `spee.ch-sync` tool available at [billbitt/spee.ch-sync](https://github.com/billbitt/spee.ch-sync)

This is not necessary, but highly reccomended.  It will decode the blocks of the `LBRY` blockchain and add the claims information to your database's tables

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

## Contribute

### Stack
The spee.ch stack is MySQL, Express.js, Node.js, and React.js.  Spee.ch also runs `lbrynet` on its server, and it uses the `lbrynet` api to make requests -- such as `publish`, `create_channel`, and `get` -- on the `LBRY` network.
  
Spee.ch also runs a sync tool, which decodes blocks from the `LBRY` blockchain as they are mined, and stores the information in mysql.  It stores all claims in the `Claims` table, and all channel claims in the `Certificates` table.

* server
  * [mysql](https://www.mysql.com/)
  * [express](https://www.npmjs.com/package/express) 
  * [node](https://nodejs.org/)
  * [lbry](https://github.com/lbryio/lbry)
  * [ffmpeg](https://www.ffmpeg.org/)
* client
  * [react](https://reactjs.org/)
 
 
### Architecture 
* the `server/` folder contains all of the server code
  * `index.js` is the entry point for the server.  It creates the [express app](https://expressjs.com/), requires the routes, syncs the database, and starts the server listening on the `PORT` designated in the config file.
  * the `server/routes` folder contains all of the routes for the express app
  * the `server/models` folder contains all of the models which the app uses to interact with the `mysql` database.  Note: this app uses the [sequelize](http://docs.sequelizejs.com/) ORM.
* the `client/` folder contains all of the client code
 
### Issue tags in this repo
#### level 1
Issues that anyone with basic web development can handle; little-to-no experience with the spee.ch codebase is required.

#### level 2 
Familiarity with web apps is required, but little-to-no familiarity with the lbry daemon is necessary

#### level 3
Familiarity with the spee.ch code base and how the lbry daemon functions is required

#### level 4
Issues with lbry (e.g. the spee.ch wallet, lbrynet configuration, etc.) that require strong familiarity with the lbry daemon and/or network to fix. Generally these issues are best suited for the `lbry` `protocol team` but are reported in this repo because of they are part of the spee.ch implementation

### Tests
* This package uses `mocha` with `chai` for testing.
* Before running tests, create a `testingConfig.js` file in `devConfig/` by copying `testingConfig.example.js`   
* To run tests:
  *  To run all tests, including those that require LBC (like publishing), simply run `npm test`
  *  To run only tests that do not require LBC, run `npm run test:no-lbc`

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
  
## Bugs
If you find a bug or experience a problem, please report your issue here on github and find us in the lbry discord!
