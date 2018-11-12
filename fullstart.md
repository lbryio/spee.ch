# Create Your Own Spee.ch!

## 1. Prerequisites
### You will need the following tools installed

* Node (v8 LTS).
* Make sure you install from the **Node** website [link](https://nodejs.org/en/download/).
* npm (should come installed with Node).
* Git
* Curl
* Tmux
* Unzip

### Make sure **npm** is up-to-date.
```
$ npm update
```

### Setup a Webserver to serve **Spee.ch** from Port **3000**.
* If you are using a server provided by **lbry**, we will have **caddy** installed already.
* If you are using your own server, make sure to have a web server installed and set up to serve from port **3000**.
* Nginx instructions (recommended).
  * Insert directions for certbot before installing.
  * Install [Nginx](http://nginx.org/en/docs/install.html).
  * Create a config file called `spee.ch` in */etc/nginx/sites-available*
  * see example: [config file](https://github.com/lbryio/spee.ch/blob/master/nginx_example_config).
  * Rename all mentions of *sub.domain.com* with your subdomain name.
  * Run this command to link the sites-available.

    `$ ln -s /etc/nginx/sites-available/speech /etc/nginx/sites-enabled/speech`

  * Restart Nginx.

    `$ sudo service nginx restart`

  * Try visiting your website.
      * If Nginx is working, you should get a **502** error because there is nothing running on **3000** yet.
      * If you get the default Nginx greeting, you have not properly configured it to serve from port **3000**.
      * You can find logs in */var/log/nginx/* too.
  *  Caddy tutorial: [https://caddyserver.com/tutorial](https://caddyserver.com/tutorial)
### MySql

* Install MySql
  * [Instructions](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en)
* Create user **root**.
	* Note: We are going to access **mysql** as **root** for this setup, but you may want to create a separate user in the future.
  * Keep your password somewhere handy!
* Create a database called **lbry** and make sure you can use it.

	  `CREATE DATABASE lbry;`

	  `$ USE lbry;`

	  `$ exit; (or press ‘ctl + d’)`

* Try logging into mysql.

	  `$ mysql -u username -p`

* If you are using a **LBRY** server, your **password** is the one provided for **ssh**.
  * Note: If it fails, try using `sudo`.

##2.  Install & Run the LBRY Daemon

### Install **lbrynet**
_note: if you have a server from LBRY, lbrynet is already installed, you can skip to 2.4._
```
$ wget --quiet -O ~/latest_daemon.zip https://lbry.io/get/lbrynet.linux.zip
$ unzip -o -u "~/latest_daemon.zip"
```
### Start lbrynet
```
$ tmux
$ ./lbrynet-daemon
```

### Detach (exit) the tmux session and leave **lbrynet** running in the background.

press `ctrl` + `b` then `d` to detach

### Get LBC!

Get a list of your wallets:

```
$ ~/lbrynet-cli wallet_list
```

Send some LBC to one of the addresses from your wallet.

Check your balance again:

```
$ ~/lbrynet-cli wallet_balance
```

You should have **LBC**!

### Install ffmpeg

directions: [here](https://www.ffmpeg.org/download.html)

## 3.  Set up Spee.ch

### Clone the spee.ch repo

```
$ git clone https://github.com/lbryio/www.spee.ch.git
```

Change directory into your site’s folder

```
$ cd <name-of-your-site>` or `$ cd www.spee.ch
```

Install dependencies

```
$ npm install
```

Run the config cli:

```
$ npm run configure
```

Check your site configs
```
$ cd /site/config/
$ nano siteConfig.json
```

### Build & run

Run the below command to transpile, build, and start your server.
```
$ npm run start
```

_**Note:** if you had to use `sudo` to login to **mysql** above, you may have issues with this step._

Spee.ch should now be running !

Visit your site in the browser. Try publishing an image!


## 4. Bonus:

### Install PM2 and run your server with PM2

Install PM2
```
$ sudo npm i -g pm2
```

From inside your project’s folder, start your server with PM2.
```
$ pm2 start server.js
```

Visit your site and see if it is running!
