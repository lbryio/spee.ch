#!/bin/bash
sudo ufw status
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw allow 3333
sudo ufw allow 4444
sudo ufw default allow outgoing
sudo ufw default deny incoming
sudo ufw show added
sudo ufw enable
sudo ufw status
