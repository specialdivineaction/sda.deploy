FROM ubuntu:14.04

# Container to run Tomcat 7

# Install Tomcat 7 in a container
# expects to be called with the following environment variables set:
# * tomcat_xmx
# * tomcat_xms
# * tomcat_maxpermsize
# * tomcat_log_dir
# * tomcat_webapp_dir
#
# defaults are set in ansible for above


MAINTAINER Joshua Cook <a href="mailto:joshuacook@tamu.edu">joshuacook@tamu.edu</a>

ENV REFRESHED_AT=2016-02-11 \
    BUILD_ID=1 \
    LANG=en_US.UTF-8 \ 
    LANGUAGE=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8 \
    HOME=/root \
    DEBIAN_FRONTEND=noninteractive \
    JAVA_HOME=/usr/lib/jvm/java-8-oracle \
    PATH=/sbin:/usr/sbin:/usr/bin:/bin \
    tomcat_log_dir=/usr/local/tomcat/logs \
    tomcat_webapp_dir=/usr/local/tomcat/webapps \
    TOMCAT_USER=tomcat7 \
    TOMCAT_UID=8009

COPY install_tomcat_docker.yml launch_tomcat7_docker.yml setenv.sh.j2 /tmp/

RUN /usr/sbin/groupadd -r $TOMCAT_USER; \
    /usr/sbin/useradd -r -u $TOMCAT_UID -g $TOMCAT_USER $TOMCAT_USER; \
    mkdir /home/$TOMCAT_USER; \
    chown -R $TOMCAT_USER:$TOMCAT_USER /home/$TOMCAT_USER; \ 
    dpkg-divert --local --rename --add /sbin/initctl; \
    ln -s /bin/true /sbin/initctl; \
    sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list; \
    /usr/sbin/locale-gen en_US.UTF-8; \
    apt-get -y update; \
    apt-get install --no-install-recommends -y -q git curl unzip python python-six python-yaml python-jinja2 python-apt python-pycurl python-setuptools python-software-properties software-properties-common; \
    add-apt-repository ppa:pharmgkb/trusty; \
    apt-get -y update; \
    apt-get install --no-install-recommends -y -q libtcnative-1; \
    cd /usr/local/bin/; \
    git clone git://github.com/ansible/ansible.git --recursive; \
    cd /usr/local/bin/ansible; \
    git checkout e560bfeaca914c5fedf2a912f6f6fb852c534306; \
    #apt-add-repository ppa:ansible/ansible -y; \
    #apt-get -y update; \
    #apt-get install -y -q ansible; \
    gpg --keyserver pgp.mit.edu --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4; \
    curl -o /usr/local/bin/gosu -SL "https://github.com/tianon/gosu/releases/download/1.7/gosu-$(dpkg --print-architecture)"; \
    curl -o /usr/local/bin/gosu.asc -SL "https://github.com/tianon/gosu/releases/download/1.7/gosu-$(dpkg --print-architecture).asc"; \
    gpg --verify /usr/local/bin/gosu.asc; \
    rm /usr/local/bin/gosu.asc; \
    chmod +x /usr/local/bin/gosu; \
    #source /usr/local/bin/ansible/hacking/env-setup; \
    . /usr/local/bin/ansible/hacking/env-setup; \
    /usr/local/bin/ansible/bin/ansible-playbook /tmp/install_tomcat_docker.yml -c local; \
    apt-get clean

ADD foreground.sh /usr/local/tomcat/bin/foreground.sh
RUN chmod 0750 /usr/local/tomcat/bin/foreground.sh

VOLUME ["/usr/local/tomcat/logs", "/usr/local/tomcat/webapps"]

EXPOSE 8080 8009 

CMD ["/usr/local/tomcat/bin/foreground.sh"]


