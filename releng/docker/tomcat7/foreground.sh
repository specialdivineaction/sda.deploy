#!/bin/bash

#source /usr/local/bin/ansible/hacking/env-setup

/usr/local/bin/ansible-playbook /tmp/launch_tomcat7_docker.yml -c local

exec /usr/local/bin/gosu $TOMCAT_USER /usr/local/tomcat/bin/catalina.sh run