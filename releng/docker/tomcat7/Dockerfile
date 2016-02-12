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
    tomcat_webapp_dir=/usr/local/tomcat/webapps

COPY install_tomcat_docker.yml launch_tomcat7_docker.yml setenv.sh.j2 /tmp/

RUN dpkg-divert --local --rename --add /sbin/initctl; \
    ln -s /bin/true /sbin/initctl; \
    sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list; \
    /usr/sbin/locale-gen en_US.UTF-8; \
    apt-get -y update; \
    apt-get install --no-install-recommends -y -q curl unzip python python-yaml python-jinja2 python-apt python-pycurl python-setuptools python-software-properties software-properties-common; \
    apt-add-repository ppa:ansible/ansible -y; \
    apt-get -y update; \
    apt-get install -y -q ansible; \
    ansible-playbook /tmp/install_tomcat_docker.yml -c local; \
    apt-get clean

ADD foreground.sh /usr/local/tomcat/bin/foreground.sh
RUN chmod 0750 /usr/local/tomcat/bin/foreground.sh

VOLUME ["/usr/local/tomcat/logs", "/usr/local/tomcat/webapps"]

EXPOSE 8080 8009 

CMD ["/usr/local/tomcat/bin/foreground.sh"]


