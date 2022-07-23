FROM ubuntu:20.04

# Install prerequisites
ADD security.list /etc/apt/sources.list.d/security.list
RUN export DEBIAN_FRONTEND=noninteractive
RUN ln -fs /usr/share/zoneinfo/UTC /etc/localtime
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install curl lsof nodejs nginx fcgiwrap libfcgi-dev spawn-fcgi git openssh-client libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb jq
RUN apt-get -y install npm --fix-missing
RUN echo "deb http://packages.cloud.google.com/apt gcsfuse-focal main" | tee /etc/apt/sources.list.d/gcsfuse.list
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
RUN apt-get update
RUN apt-get -y install gcsfuse

# Prepare credentials dir
RUN mkdir -p /root/.ssh
RUN chmod 700 /root/.ssh
RUN chown -R root:root /root/.ssh
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

# Install npm
ADD . /app
WORKDIR /app
RUN curl -sL https://deb.nodesource.com/setup_14.x -o setup_14.sh
RUN bash setup_14.sh
RUN apt-get update
RUN apt-get install -y nodejs
RUN npm install --save-dev -D cypress-iframe@1.0.1
RUN npm install --save-dev cypress@>=6.2.0
RUN npm install --save cypress@>=6.2.0
RUN npm install --save-dev @types/cypress@^1.1.0
RUN npm install --save-dev mochawesome@6.3.1
RUN npm install --save-dev mocha@>=7
RUN npm install

ADD .deploy/run.sh /run.sh
ADD vhost.conf /etc/nginx/sites-available/default
RUN mkdir -p /usr/share/nginx/check /usr/share/nginx/reports /usr/share/nginx/html
RUN chown www-data /usr/share/nginx/reports /usr/share/nginx/check /usr/share/nginx/html
ADD .deploy/ts /TS
ADD .deploy/release /RELEASE
ADD .deploy/configurator.sh /configurator.sh
ADD .deploy/run.sh /run.sh
RUN chmod +x /configurator.sh /run.sh
CMD /run.sh
