# Spee.ch

spee.ch provides a user-friendly, custom-designed, image and video hosting site backed by a decentralized network and
blockchain ([LBRY](https://lbry.tech/)). Via just a small set of config files, you can spin your an entire spee.ch site back up including assets.

**Please note: the spee.ch code base and setup instructions are no longer actively maintained now that we have lbry.tv. Proceed at your own caution. Setup will require dev ops skills.**

![App GIF](https://spee.ch/e/speechgif.gif)

For a completely open, unrestricted example of a spee.ch site, check out https://www.spee.ch.

For a closed, custom-hosted and branded example, check out https://lbry.theantimedia.com/.

## Installation

### Ubuntu Step-by-Step

[Step-by-step Ubuntu Install Guide](./docs/ubuntuinstall.md)

### Full Instructions

#### Get some information ready:

- mysqlusername
- mysqlpassword
- domainname or 'http://localhost:3000'
- speechport = 3000

#### Install and Set Up Dependencies

- Firewall open ports
  - 22
  - 80
  - 443
  - 3333
  - 4444
- [NodeJS](https://nodejs.org)
- [MySQL version 5.7 or higher](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
  - mysqlusername or root
  - mysqlpassword
  - Requires mysql_native_password plugin
  ```
  mysql> `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';`
  ```
- [lbrynet](https://github.com/lbryio/lbry) daemon
  - run this as a service exposing ports 3333 and 4444
  - _note_: once the daemon is running, issue commands in another terminal session (tmux) to retrieve an address for your wallet to recieve 5+ LBC credits (or join us in the [#speech discord channel](https://discord.gg/YjYbwhS) and we will send you a few)
    - `./lbrynet commands` gets a list of commands
    - `./lbrynet account_balance` gets your balance (initially 0.0)
    - `./lbrynet address_list` gets addresses you can use to recieve LBC
- [FFmpeg](https://www.ffmpeg.org/download.html)
- [ImageMagick](https://packages.ubuntu.com/xenial/graphics/imagemagick)
- Spee.ch (below)
- pm2 (optional) process manager such as pm2 to run speech server.js
- http proxy server e.g. caddy, nginx, or traefik, to forward 80/443 to speech port 3000
  - _note: even running on http://localhost, you must redirect http or https to port 3000_

#### Clone spee.ch

- release version for stable production

```
$ git clone -b release https://github.com/lbryio/spee.ch.git
```

- master version for development

```
$ git clone https://github.com/lbryio/spee.ch.git
```

- your own fork for customization

#### Change directory into your project

```
$ cd spee.ch
```

#### Install node dependencies

```
$ npm install
```

#### Create the config files using the built-in CLI

Make sure lbrynet is running in the background before proceeding.

_note: If you are opt to run a local chainquery, such as from [lbry-docker/chainquery](https://github.com/lbryio/lbry-docker/tree/master/chainquery) you will need to specify connection details at this time in:_ ~/spee.ch/docs/setup/conf/speech/chainqueryConfig.json

```
$ npm run configure
```

#### Build & start the app

```
$ npm run build

$ npm run start
```

#### View in browser

- Visit [http://localhost:3000](http://localhost:3000) in your browser

#### Customize your app

Check out the [customization guide](https://github.com/lbryio/spee.ch/blob/master/customize.md) to change your app's appearance and components

#### (optional) add custom components and update the styles

- Create custom components by creating React components in `site/custom/src/`
- Update or override the CSS by changing the files in `site/custom/scss`

#### (optional) install your own chainquery

Instructions are coming at [lbry-docker] to install your own chainquery instance using docker-compose. This will require 50GB of preferably SSD space and at least 10 minutes to download, possibly much longer.

## Settings

There are a number of settings available for customizing the behavior of your installation.  
[Here](https://github.com/lbryio/spee.ch/blob/master/docs/settings.md) is some documentation on them.

## API

#### /api/claim/publish

method: `POST`

example:

```
curl -F 'name=MyPictureName' -F 'file=@/path/to/myPicture.jpeg' https://spee.ch/api/claim/publish
```

Parameters:

- `name` (required, must be unique across the instance)
- `file` (required) (must be type .mp4, .jpeg, .jpg, .gif, or .png)
- `nsfw` (optional)
- `license` (optional)
- `title` (optional)
- `description` (optional)
- `thumbnail` URL to thumbnail image, for .mp4 uploads only (optional)
- `channelName` channel to publish too (optional)
- `channelPassword` password for channel to publish too (optional, but required if `channelName` is provided)

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
    "success": <bool>,  // `true` if spee.ch successfully checked the claim availability
    "data": <bool>, // `true` if claim is available, false if it is not available
    "message": <string> // human readable message of whether claim was available or not
}
```

## Contribute

### Stack

The spee.ch stack is MySQL, Express.js, Node.js, and React.js. Spee.ch also runs `lbrynet` on its server, and it uses the `lbrynet` API to make requests -- such as `publish`, `create_channel`, and `get` -- on the `LBRY` network.

Spee.ch also runs a sync tool, which decodes blocks from the `LBRY` blockchain as they are mined, and stores the information in MySQL. It stores all claims in the `Claims` table, and all channel claims in the `Certificates` table.

- server
  - [MySQL](https://www.mysql.com/)
  - [express](https://www.npmjs.com/package/express)
  - [node](https://nodejs.org/)
  - [lbry](https://github.com/lbryio/lbry)
  - [FFmpeg](https://www.ffmpeg.org/)
- client
  - [react](https://reactjs.org/)
  - redux
  - sagas
  - scss
  - handlebars

### Architecture

- `cli/` contains the code for the CLI tool. Running the tool will create `.json` config files and place them in the `site/config/` folder

  - `configure.js` is the entry point for the CLI tool
  - `cli/defaults/` holds default config files
  - `cli/questions/` holds the questions that the CLI tool asks to build the config files

- `client/` contains all of the client code

  - The client side of spee.ch uses `React` and `Redux`
  - `client/src/index.js` is the entry point for the client side js. It checks for preloaded state, creates the store, and places the `<App />` component in the document.
  - `client/src/app.js` holds the `<App />` component, which contains the routes for `react-router-dom`
  - `client/src/` contains all of the JSX code for the app. When the app is built, the content of this folder is transpiled into the `client/build/` folder.
    - The Redux code is broken up into `actions/` `reducers/` and `selectors/`
    - The React components are broken up into `containers/` (components that pull props directly from the Redux store), `components/` ('dumb' components), and `pages/`
    - spee.ch also uses sagas which are in the `sagas/` folders and `channels/`
  - `client/scss/` contains the CSS for the project \*

- `site/custom` is a folder which can be used to override the default components in `client/`

  - The folder structure mimics that of the `client/` folder
  - to customize spee.ch, place your own components and scss in the `site/custom/src/` and `site/custom/scss` folders.

- `server/` contains all of the server code

  - `index.js` is the entry point for the server. It creates the [express app](https://expressjs.com/), requires the routes, syncs the database, and starts the server listening on the `PORT` designated in the config files.
  - `server/routes/` contains all of the routes for the express app
  - `server/controllers/` contains all of the controllers for all of the routes
  - `server/models/` contains all of the models which the app uses to interact with the `MySQL` database.
    - Spee.ch uses the [sequelize](http://docs.sequelizejs.com/) ORM for communicating with the database.

- `tests/` holds the end-to-end tests for this project
  - Spee.ch uses `mocha` with the `chai` assertion library
  - unit tests are located inside the project in-line with the files being tested and are designated with a `xxxx.test.js` file name

### Tests

- This package uses `mocha` with `chai` for testing.
- Before running tests, create a `testingConfig.js` file in `devConfig/` by copying `testingConfig.example.js`
- To run tests:
  - To run all tests, including those that require LBC (like publishing), simply run `npm test`
  - To run only tests that do not require LBC, run `npm run test:no-lbc`

### URL formats

Spee.ch has a few types of URL formats that return different assets from the LBRY network. Below is a list of all possible URLs for the content on spee.ch. You can learn more about LBRY URLs [here](https://lbry.tech/resources/uri).

- retrieve the controlling `LBRY` claim:
  - https://spee.ch/`claim`
  - https://spee.ch/`claim`.`ext` (serve)
  - https://spee.ch/`claim`.`ext`&`querystring` (serve transformed)
- retrieve a specific `LBRY` claim:
  - https://spee.ch/`claim_id`/`claim`
  - https://spee.ch/`claim_id`/`claim`.`ext` (serve)
  - https://spee.ch/`claim_id`/`claim`.`ext`&`querystring` (serve transformed)
- retrieve all contents for the controlling `LBRY` channel
  - https://spee.ch/`@channel`
- a specific `LBRY` channel
  - https://spee.ch/`@channel`:`channel_id`
- retrieve a specific claim within the controlling `LBRY` channel
  - https://spee.ch/`@channel`/`claim`
  - https://spee.ch/`@channel`/`claim`.`ext` (serve)
  - https://spee.ch/`@channel`/`claim`.`ext`&`querystring` (serve)
- retrieve a specific claim within a specific `LBRY` channel
  - https://spee.ch/`@channel`:`channel_id`/`claim`
  - https://spee.ch/`@channel`:`channel_id`/`claim`.`ext` (serve)
  - https://spee.ch/`@channel`:`channel_id`/`claim`.`ext`&`querystring` (serve)
- `querystring` can include the following transformation values separated by `&`
  - h=`number` (defines height)
  - w=`number` (defines width)
  - t=`crop` or `stretch` (defines transformation - missing implies constrained proportions)

### Dependencies

Spee.ch depends on two other lbry technologies:

- [chainquery](https://github.com/lbryio/chainquery) - a normalized database of the blockchain data. We've provided credentials to use a public chainquery service. You can also install it on your own server to avoid being affected by the commons.
- [lbrynet](https://github.com/lbryio/lbry) - a daemon that handles your wallet and transactions.

### Bugs

If you find a bug or experience a problem, please report your issue here on GitHub and find us in the lbry discord!

## License

This project is MIT licensed. For the full license, see [LICENSE](LICENSE).

## Security

We take security seriously. Please contact security@lbry.com regarding any security issues. [Our GPG key is here](https://lbry.com/faq/gpg-key) if you need it.

## Contact

The primary contact for this project is [@jessopb](mailto:jessop@lbry.com).
