#!/bin/bash

export ANSIBLE_LIBRARY=/usr/share/ansible

/usr/bin/ansible-playbook /tmp/launch_tomcat7_docker.yml -c local

exec /usr/local/tomcat/bin/catalina.sh run