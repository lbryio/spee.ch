# Create Your Own Spee.ch on Ubuntu 16.x 18.x VPS

# Overview

## Prerequisites
  * Ability to use SSH (putty + public key for windows users)
  * Ubuntu 16.04 or 18.04 VPS with root access
    * Your login info ready
    * Exposed ports: 22, 80, 443, 3333, 4444
  * Domain name with @ and www pointed at your VPS IP
    * _alternatively, specify http://localhost:3000 as domain during speech configuration_
  * Ability to send 5+ LBRY credits to an address
  * Noncommercial use
    * _alternative configuration examples for nginx and certbot are [here](https://github.com/lbryio/spee.ch/tree/master/docs/setup/conf/nginx)_

## You'll be installing:
  * MySQL DB version 5.7 or higher
    * Default Port 3306
    * mysql_native_password plugin
  * NodeJS v8+
  * Caddy - https reverse proxy server
    * automatically obtains tls certificate
    * Redirects 80 (http) to 443 (https) to Speech on 3000 
  * Lbrynet DAEMON started on ports 3333 and 4444
  * Spee.ch started on port 3000

# 1. Setup OS and install dependencies
## OS

### Secure your server by creating a non-root sudoer.

As root# _create user and add to sudo group_
```
  adduser username
  usermod -aG sudo username
  su - username
```
As username: *paste public key in authorized\_keys*
```
  `cd`
  `mkdir .ssh`
  `nano ~/.ssh/authorized_keys`
```

### Prep

Log in as username@domainname or username@ip_address

  `sudo apt-get update -y`

  `ulimit -n 8192`

  `wget -qO- https://deb.nodesource.com/setup_8.x | sudo -E bash -`


## Git, Curl, Tmux, Unzip, ffmpeg, Node

  `sudo apt-get install git curl tmux unzip ffmpeg nodejs -y`

## Clone speech either from your own fork, or from the lbryio/spee.ch repo.

  * For Developers - our master branch

  `git clone https://github.com/lbryio/spee.ch`

  * For Developers - your fork

  `git clone https://github.com/{{youraccount}}/spee.ch.git`

  `git clone git@github.com:{{youraccount}}/spee.ch`

  * For Publishers and Content creators - stable release

  `git clone -b release https://github.com/lbryio/spee.ch`

## Prepare the scripts

  `chmod 750 -R ~/spee.ch/docs/setup`

# 2 Secure the UFW firewall
## UFW

  `sudo ~/spee.ch/docs/setup/scripts/firewall.sh`

# 3 Install Caddy to handle https and reverse proxy
##  Get Caddy

  `curl https://getcaddy.com | sudo bash -s personal`

## Set up Caddy reverse proxy and ssl

  `sudo mkdir -p /opt/caddy/logs/`

  `sudo mkdir -p /opt/caddy/store/`

  `cp ~/spee.ch/docs/setup/conf/caddy/Caddyfile.template ~/spee.ch/docs/setup/conf/caddy/Caddyfile`

  `nano ~/spee.ch/docs/setup/conf/caddy/Caddyfile`

   ( Change {{EXAMPLE.COM}} to YOURDOMAIN.COM )

  `sudo cp ~/spee.ch/docs/setup/conf/caddy/Caddyfile /opt/caddy/`

## Set up Caddy to run as systemd service

  `sudo cp ~/spee.ch/docs/setup/conf/caddy/caddy.service /etc/systemd/system/caddy.service`

  `sudo chmod 644 /etc/systemd/system/caddy.service`

  `sudo chown -R www-data:www-data /opt/caddy/`

  `sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/caddy`

  `sudo systemctl daemon-reload`

  `sudo systemctl start caddy`

  `sudo systemctl status caddy`

  `q` exits

  At this point, navigating to yourdomain.com should give you a 502 bad gateway error. That's good!

  Now you can make sure caddy starts when the machine starts:

  `sudo systemctl enable caddy`


# 4 Set up MySQL

## Install MySQL

  `sudo apt-get install mysql-server -y`

  ( During install, enter blank password each time if prompted. We'll set one during secure setup.)

  `sudo systemctl status mysql` (q to exit)

## Secure Setup

  `sudo mysql_secure_installation`
  
  * Password your_mysql_password
  * No to password validation
  * Y to all other options


## Login to mysql from root to complete setup:

  `sudo mysql` to enter mysql> console

  mysql>

  `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_mysql_password';`

  mysql>

  `FLUSH PRIVILEGES;`

  `Control+D` to exit

  Verify:

  `mysql -u root -p` and then entering your_mysql_password should give you the mysql> shell

# 5 Get Lbrynet SDK Daemon

## Start tmux

tmux allows you to run multiple things in different sessions. Useful for manually starting daemons and watching its console logs.

  `tmux`
  * `Ctrl+b`, then `d` detaches leaving session running.
  * `tmux`, reenters tmux, then
    * `Ctrl+b`, `(` goes back to through sessions

## Get the SDK
  `wget -O ~/latest_daemon.zip https://lbry.io/get/lbrynet.linux.zip`

  `unzip -o -u ~/latest_daemon.zip`

## Customize SDK settings

  These settings will prevent you and your users from spending your server's LBC on paid content. Full documentation is [here](https://lbry.tech/resources/daemon-settings).
  
  ~$
  `mkdir .lbrynet`
  
  `cd .lbrynet`
  
  `nano daemon_settings.yml`
  
   copy and paste in the following code (Ctrl+Shift V)

  ```
  run_reflector_server: false
  disable_max_key_fee: false
  max_key_fee: {amount: 0, currency: LBC}
  use_upnp: false
  auto_re_reflect_interval: 0
 ```
 
 `CONTROL+O` then `CONTROL+X` to save and exit
 
## Start the daemon
   `./lbrynet start`

## Detatch tmux session
  `Control + b`, then `d`

  * `tmux` if you want to get back into tmux

  * `Control+b`, then `)` while in tmux session to cycle back to your lbrynet session to see output
  
  `tmux`

  _note: `Control+b`, then `)` while in tmux session to cycle back to your lbrynet session to see output_

## Display wallet address to which to send 5+ LBC.

  _note: These commands work when `./lbrynet start` is already running in another tmux session_

  `./lbrynet commands` to check out the current commands

  `./lbrynet address_list` to get your wallet address

  `Ctrl + Shift + C` after highlighting an address to copy.

  Use a LBRY app or daemon to send LBC to the address. Sending LBC may take a few seconds or longer.

  `./lbrynet account_balance` to check your balance after you've sent LBC.

## Optional/Production: Set up lbrynet to run as a systemd service

  `//coming soon`

# 6 Set up spee.ch

## Build it
  `cd spee.ch`

  ~/spee.ch:

  `npm install`

  _note: if you have installed your own local chainquery instance, you will need to specify it in your own /site/config/chainqueryConfig.json_

  Once your wallet has a balance, run this:

  `npm run configure`    

  The script will ask for the following values:
   
    * Database: lbry
    * Username: root
    * Password: your_mysql_password
    * Port: 3000
    * Site Title: Your Site Name
    * Enter your site's domain name: https://example.com or http://localhost:3000
    * Enter a directory where uploads should be stored: (/home/lbry/Uploads)
     
  `npm run build`  (or `npm run dev` to build for developing)

  `npm run start`

## Try it

  Navigate to example.com!

# 7 Production

## pm2 to keep your speech app running
 ```
 npm install -g pm2
 ```

### 7 Maintenance Procedures

#### Change daemon
  * backup wallet (private keys!) to a safe place
  * wget daemon from https://github.com/lbryio/lbry/releases
  * wget -O ~/your_name_daemon.zip https://your_copied_file_path.zip
  * rm ./lbrynet
  * unzip -o -u ~/your_name_daemon.zip
