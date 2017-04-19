Steps to install SDA
====================

These steps assume you are running Ubuntu 14.04 LTS or CentOS/RHEL 7.2.
They also assumes that you have copied the sda.war and SSL cert pieces to the same directory as the playbook (by default /sda/releng/ansible). Note also that the admin interface is protected with a default username of `sda` and password of `Password123`. Please change this before going live!

**It is recommended to reboot when this completes.**

Basic steps to run ansible playbook

* If running Ubuntu, do these steps:
  * `sudo su`
  * `aptitude update`
  * `aptitude install git software-properties-common python-six python-software-properties python-apt python-pycurl python-jinja2 python-yaml python-setuptools python-pip python-dev libffi-dev libssl-dev`
* If running CentOS/RHEL, do these steps:
  * `sudo su`
  * `yum install -y epel-release`
  * `yum install -y python-devel libffi-devel openssl-devel gcc python-pip redhat-rpm-config git python-crypto python-jinja2 python-yaml`
  * `pip install --upgrade pip`
  * `pip install paramiko httplib2 six`
* The remaining steps are the same whether running Ubuntu or RHEL/CentOS
* `pip install ansible==2.1`  
* Verify the installation by running `ansible --version`. You should see output indicating that Ansible is at version 2.1.0.0. If you get errors on running this, run `pip install ansible==2.1 --upgrade`
* `mkdir /sda`
* `cd /sda`
* `git clone https://github.com/tcat-tamu/sda.deploy .`
* `cd releng`
* `cd ansible`
* Edit variables in setup_sda.yml as needed
* Also edit config in /sda/war_config/config.properties - especially URL and postgresql connection information
* Keep in mind that all connection information / URL's are from the perspective of inside the Docker container.
* Be sure to edit the opennlp.models.sentence.path property to reflect the desired language model. It should point at the full path of the file. It defaults to the supplied model.
* Create 2 different 256 bit tokens with the command `openssl rand -base64 32` and insert in the appropriate place
* Copy sda.war to this folder
* Copy SSL certificate, key and intermediate cert to this directory 
* `ansible-playbook setup_sda.yml -c local`
* reboot

Steps to update SDA
===================

The following commands must be run as root.

    sudo su

Give the currently running SDA Tomcat container a backup name, and stop the container

    docker rename sda sda-old
    docker stop sda-old

The following commands are to be executed under the Tomcat container's **webapps** directory (`/tomcat/sda/webapps` by default).
Here we Back up the original WAR (just in case), remove existing application data, and copy the new war into place.

    mv sda.war ~/sda.war.bak
    rm -rf sda
    mv ~/sda.war .
    chown 8009:docker sda.war

The following command must be executed under the Ansible script location (originally set up as `/sda/releng/ansible` above).
Here we deploy the new container with the new WAR.

    ansible-playbook setup_sda.yml -c local --tags=sda_container

After thorough testing, if site appears to be working properly, remove the old container and backup WAR.

    docker rm sda-old
    rm ~/sda.war.bak