#!/bin/bash

sudo /usr/bin/docker run -d --restart="always" --name="solr" -p 127.0.0.1:8983:8983 -m=512m -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro -v /sda/solr/articles:/opt/solr/server/solr/articles:rw -v /sda/solr/bio:/opt/solr/server/solr/bio:rw -v /sda/solr/relationships:/opt/solr/server/solr/relationships:rw -v /sda/solr/biblio:/opt/solr/server/solr/biblio:rw -t sda-solr

# use this line to run bash in the container for testing
#sudo /usr/bin/docker run -i --restart="always" --name="solr" -p 127.0.0.1:8983:8983 -m=512m -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro -v /sda/solr/articles:/opt/solr/server/solr/articles:rw -v /sda/solr/bio:/opt/solr/server/solr/bio:rw -v /sda/solr/relationships:/opt/solr/server/solr/relationships:rw -v /sda/solr/biblio:/opt/solr/server/solr/biblio:rw -t sda-solr