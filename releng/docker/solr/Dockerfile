FROM solr:5.5

# Container to run solr while allowing the ability to take ownership of data files mapped in as volumes

MAINTAINER Joshua Cook <a href="mailto:joshuacook@tamu.edu">

USER root
RUN mkdir -p /home/solr; \
    chown -R solr:solr /home/solr; \
    gpg --keyserver pgp.mit.edu --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4; \
    curl -o /usr/local/bin/gosu -SL "https://github.com/tianon/gosu/releases/download/1.7/gosu-$(dpkg --print-architecture)"; \
    curl -o /usr/local/bin/gosu.asc -SL "https://github.com/tianon/gosu/releases/download/1.7/gosu-$(dpkg --print-architecture).asc"; \
    gpg --verify /usr/local/bin/gosu.asc; \
    rm /usr/local/bin/gosu.asc; \
    chmod +x /usr/local/bin/gosu

COPY foreground.sh /usr/solr/bin/foreground.sh
RUN chmod 755 /usr/solr/bin/foreground.sh

CMD ["/usr/solr/bin/foreground.sh"]


