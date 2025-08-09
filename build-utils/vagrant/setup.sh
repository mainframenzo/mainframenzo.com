#!/bin/bash
set -ex

export DEBIAN_FRONTEND=noninteractive

# TODO install docker
# TODO install this

apt-get install -y \
  xfce4 \
  virtualbox-guest-dkms \
  virtualbox-guest-utils \
  virtualbox-guest-x11 \
  ubuntu-gnome-desktop \
  gnome-shell \
  gnome 

sed -i 's/allowed_users=.*$/allowed_users=anybody/' /etc/X11/Xwrapper.config

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

sed -ri 's/^(Exec=.*)$/#\1/' /etc/xdg/autostart/gnome-initial-setup-first-login.desktop

touch /root/.bash_profile
echo -e "xrandr -s 1024x768 -r 85" >> /root/.bash_profile

startx