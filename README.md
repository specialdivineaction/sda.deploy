Steps to install SDA
====================

These steps assume you are running Ubuntu 14.04 LTS or CentOS/RHEL 7.2.
They also assumes that you have copied the sda.war and SSL cert pieces to the same directory as the playbook (by default /sda/releng/ansible)

**It is recommended to reboot when this completes.**

Basic steps to run ansible playbook

* If running Ubuntu, do these steps:
  * `sudo su`
  * `aptitude update`
  * `aptitude install git software-properties-common python-six python-software-properties python-apt python-pycurl python-jinja2 python-yaml python-setuptools python-pip`
* If running CentOS/RHEL, do these steps:
  * `sudo su`
  * `yum install -y epel-release`
  * `yum install -y python-devel libffi-devel openssl-devel gcc python-pip redhat-rpm-config git python-crypto python-jinja2 python-yaml`
  * `pip install --upgrade pip`
  * `pip install paramiko httplib2 six`
* The remaining steps are the same whether running Ubuntu or RHEL/CentOS
* `pip install ansible==2.1`  
* Verify the installation by running `ansible --version`. You should see output indicating that Ansible is at version 2.1.0.0
* `mkdir /sda`
* `cd /sda`
* `git clone https://github.com/tcat-tamu/sda.deploy .`
* `cd releng`
* `cd ansible`
* Edit variables in setup_sda.yml as needed
* Also edit config in /sda/war_config/config.properties - especially URL and postgresql connection information
* Copy sda.war to this folder
* Copy SSL certificate, key and intermediate cert to this directory 
* `ansible-playbook setup_sda.yml -c local`
* reboot

