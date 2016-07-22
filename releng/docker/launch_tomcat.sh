#!/bin/bash

sudo /usr/bin/docker run -d --restart="always" --name="sda" -e "tomcat_xmx=768m" -e "tomcat_xms=256m" -e "tomcat_maxpermsize=256m" -p 127.0.0.1:8080:8080 -p 127.0.0.1:8009:8009 -m=768m -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro -v /tomcat/sda/webapps:/usr/local/tomcat/webapps:rw -v /tomcat/sda/logs:/usr/local/tomcat/logs:rw -v /sda:/war-deployment/sda.deploy:rw -t sda/tomcat7

# use this line to run bash in the container for testing
#sudo /usr/bin/docker run -it --restart="always" --name="sda" -e "tomcat_xmx=768m" -e "tomcat_xms=256m" -e "tomcat_maxpermsize=256m" -p 127.0.0.1:8080:8080 -p 127.0.0.1:8009:8009 -m=768m -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro -v /tomcat/sda/webapps:/usr/local/tomcat/webapps:rw -v /tomcat/sda/logs:/usr/local/tomcat/logs:rw -v /sda:/war-deployment/sda.deploy:rw -t sda/tomcat7 /bin/bash