Steps to install SDA
====================

These steps assume you are running Ubuntu 14.04 LTS.
They also assumes that you have copied the catalog.war and SSL cert pieces to the same directory as the playbook (by default /sda/releng/ansible)

**It is recommended to reboot when this completes.**

Basic steps to run ansible playbook

* sudo su
* aptitude update
* aptitude install git software-properties-common python-six python-software-properties python-apt python-pycurl python-jinja2 python-yaml python-setuptools
* cd /tmp
* git clone git://github.com/ansible/ansible.git --recursive
* cd /tmp/ansible
* git checkout tags/v2.1.0.0-1
* source ./hacking/env-setup 
* mkdir /sda
* cd /sda
* git clone https://github.com/tcat-tamu/sda.deploy .
* cd releng
* cd ansible
* Edit variables in setup_sda.yml as needed
* Also edit config in /sda/catalog_war/config.properties - especially URL and postgresql connection information
* Copy catalog.war to this folder
* Copy SSL certificate, key and intermediate cert to this directory 
* ansible-playbook setup_sda.yml -c local
* reboot

