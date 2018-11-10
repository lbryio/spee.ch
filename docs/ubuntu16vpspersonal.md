# Create Your Own Spee.ch on Ubuntu 16.x 18.x VPS

# Overview

## Prerequisites
  * UBUNTU 16+ VPS with root access
    * Your login info ready
  * Domain name with @ and www pointed at your VPS IP
  * Email Address
  * Ability to send 5+ LBRY credits to an address
  * Noncommercial use (highly suggested, but you still _could_)
  * We recommend that you fork Spee.ch so that you can customize the site.

## You'll be installing:
  * MYSQL DB
    * Default Port
  * NODE v8+
  * HTTPS PROXY SERVER
    * Caddy for personal use
    * Exposed ports: 22, 80, 443, 3333, 4444
    * Reverse proxies to App on 3000
  * SPEE.CH
  * LBRYNET DAEMON


# 1. Update OS and install packages
## OS
  `sudo apt-get update -y`

  `ulimit -n 8192`

## Git

  `sudo apt-get install git -y`

## NODE v8

  `wget -qO- https://deb.nodesource.com/setup_8.x | sudo -E bash -`

  `sudo apt-get install -y nodejs`

## Curl, Tmux, Unzip, ffmpeg

  `sudo apt-get install curl tmux unzip ffmpeg -y`

## Grab config files

  `git clone https://github.com/jessopb/speechconfigs.git`

  `chmod 640 -R ~/speechconfigs`

# 2 Secure the UFW firewall
## UFW

  `sudo ufw status`

  `sudo ufw allow 80`

  `sudo ufw allow 443`

  `sudo ufw allow 22`

  `sudo ufw allow 3333`

  `sudo ufw allow 4444`

  `sudo ufw default allow outgoing`

  `sudo ufw default deny incoming`

  `sudo ufw show added`

  `sudo ufw enable` (yes, you've allowed ssh 22)

  `sudo ufw status`

# 3 Install Caddy to handle https and reverse proxy
##  Get Caddy

  `curl https://getcaddy.com | bash -s personal`

## Set up Caddy

  `mkdir -p /opt/caddy/logs/`

  `mkdir -p /opt/caddy/store/`

  `cp ~/speechconfigs/caddy/Caddyfile.speechsample ~/speechconfigs/caddy/Caddyfile`

  `nano ~/speechconfigs/caddy/Caddyfile`
   ( Change {{EXAMPLE.COM}} to YOURDOMAIN.COM )

  `cp ~/speechconfigs/caddy/Caddyfile /opt/caddy/`

## Set up Caddy to run as systemd service

  `cp ~/speechconfigs/caddy/caddy.service /etc/systemd/system/caddy.service`

  `chmod 644 /etc/systemd/system/caddy.service`

  `chown -R www-data:www-data /opt/caddy/`

  `setcap 'cap_net_bind_service=+ep' /usr/local/bin/caddy`

  `systemctl daemon-reload`

  `systemctl start caddy`

  `systemctl status caddy`

  At this point, navigating to yourdomain.com should give you a 502 bad gateway error. That's good!

# 4 Set up MySql

## Install MySql

  `sudo apt-get install mysql-server -y`
  ( enter blank password each time )
  `sudo systemctl status mysql` (q to exit)

## Secure Setup

  `sudo mysql_secure_installation`
  * No to password validation
  * Y to all other options
  * password abcd1234

## Login to mysql from root to complete setup:

  `mysql` to enter mysql> console

  mysql> `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'abcd1234';`

  mysql> `FLUSH PRIVILEGES;`

  Control+D to exit

  Verify:

  `mysql -u root -p` and then entering your password abcd1234 should give you the mysql> shell

# 5 Get Lbrynet Daemon

### TODO: Enable something like sudo systemctl start lbrynet so it runs as www-data

## Enter tmux

  `tmux`
  * Ctrl+b, d detaches leaving session running.
  * ~# `tmux`, Ctrl+b, ( goes back to that session.

## Get the daemon
  `wget -O ~/latest_daemon.zip https://lbry.io/get/lbrynet.linux.zip`

  `unzip -o -u ~/latest_daemon.zip`

## Start the daemon
   ~# `./lbrynet start`
## Detatch tmux session
  `Control+b, then d` to leave lbrynet daemon running and exit the session

  `tmux` if you want to get back into tmux

  `Control+b, then ) in tmux` to cycle back to your lbrynet session to see output

## Display wallet address to which to send 5+ LBC.
### These commands work when `lbrynet start` is already running in another tmux

  `./lbrynet commands` to check out the current commands

  `./lbrynet address_list` to get your wallet address

  `Ctrl + Shift + C` after highlighting an address to copy.

  Use a LBRY app or daemon to send LBC to the address. Sending LBC may take a few seconds or longer.

  `./lbrynet account_balance` to check your balance after you've sent LBC.

# 6 Set up spee.ch
## Clone speech either from your own fork, or from the lbryio/spee.ch repo.

### Developers

  SSH?

  `git clone git@github.com:{{youraccount}}/spee.ch`

  HTTPS?

  `git clone https://github.com/{{youraccount}}/spee.ch.git`

### Publishers

  `git clone -b release https://github.com/lbryio/spee.ch`

## Build it
   `cd spee.ch`

   ~/spee.ch# `npm install`

  `cp ~/speechconfigs/speech/chainqueryConfig.json ~/spee.ch/site/config/chainqueryConfig.json`

  ~/spee.ch# `npm run configure` (once your wallet balance has cleared)
    * DATABASE: lbry
    * USER NAME: root
    * PASSWORD: abcd1234
    * PORT: 3000
    * Site Title: Your Site Name
    * Enter your site's domain name: https://freezepeach.fun (this must include https://)
    * Enter a directory where uploads should be stored: (/home/lbry/Uploads)

  ~/spee.ch/# `npm run start`

## Try it

  Navigate to yourdomain.fun!


### 7 Maintenance Proceedures
* Change wallet
  * TODO
* Change daemon
  * wget daemon from https://github.com/lbryio/lbry/releases
  * wget --quiet -O ~/your_name_daemon.zip https://your_copied_file_path.zip
  * rm ./lbrynet
  * unzip -o -u ~/your_name_daemon.zip

### 7 TODO
* Don't run as root
* Use Dockerized Spee.ch and Lbrynet
  * https://github.com/lbryio/lbry-docker/tree/master/www.spee.ch
  * https://github.com/lbryio/lbry-docker/tree/master/lbrynet-daemon
  * https://blog.hasura.io/an-exhaustive-guide-to-writing-dockerfiles-for-node-js-web-apps-bbee6bd2f3c4
  * https://docs.traefik.io/user-guide/docker-and-lets-encrypt/
  * https://docs.traefik.io/configuration/acme/
* Systemd unit files
  * https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/
  * Spee.ch
    * sudo nano /lib/systemd/system/speech.service
  * Lbrynet
    * sudo nano /lib/systemd/system/lbrynet.service
    ```
    [Unit]
    Description=hello_env.js - making your environment variables read
    Documentation=https://example.com
    After=network.target

    [Service]
    Environment=NODE_PORT=3001
    Type=simple
    User=ubuntu
    ExecStart=node path/server.js
    Restart=on-failure

    [Install]
    WantedBy=multi-user.target
    ```
* Provide spee.ch build releases?
* Provide system to configure chainqueryConfig.json
* Clone speech to stripped version, streamline customization
* Automate for testing
