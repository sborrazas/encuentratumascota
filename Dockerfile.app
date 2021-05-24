FROM ruby:2.2

# Setup SSH for ansible to provision
RUN apt-get update -y && \
  apt-get install -y ssh

RUN mkdir /var/run/sshd

# Setup node + npm
RUN curl -fsSL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install --force-yes -y nodejs
