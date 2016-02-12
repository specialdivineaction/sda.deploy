#!/bin/bash

set -e

chown -R solr /opt/solr/server/solr
exec /usr/local/bin/gosu solr /opt/solr/bin/solr -f