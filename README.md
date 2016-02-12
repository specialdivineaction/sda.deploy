Steps to install SDA
====================

These steps assume you are running Ubuntu 14.04 LTS.
They also assumes that you have copied the catalog.war and SSL cert pieces to the same directory as the playbook (by default /sda/releng/ansible)

**It is recommended to reboot when this completes.**

Basic steps to run ansible playbook

* sudo aptitude install git
* sudo aptitude install software-properties-common
* sudo apt-add-repository ppa:ansible/ansible
* sudo aptitude update
* sudo aptitude install ansible
* sudo mkdir /sda
* cd /sda
* sudo git clone https://github.com/tcat-tamu/sda.deploy .
* cd releng
* cd ansible
* Edit variables in setup_sda.yml as needed
* Also edit config in /sda/catalog_war/config.properties - especially URL and postgresql connection information
* Copy catalog.war to this folder
* Copy SSL certificate, key and intermediate cert to this directory
* sudo su (run the following as root)
* ansible-playbook setup_sda.yml -c local
* reboot

