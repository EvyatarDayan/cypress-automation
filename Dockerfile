FROM ubuntu:20.04

RUN apt-get update
RUN apt-get -y install curl lsof nodejs
ADD security.list /etc/apt/sources.list.d/security.list
RUN apt-get -y install npm --fix-missing

# install git
RUN apt-get -y install git openssh-client

# Add credentials
RUN mkdir -p /root/.ssh
ADD id_rsa /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh
RUN chmod 400 /root/.ssh/id_rsa
RUN chown -R root:root /root/.ssh

# Clone automation repo
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
RUN git clone git@github.com:apester-dev/cypress-automation.git -v

# Install npm
ADD . /app
WORKDIR /app
RUN apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y
RUN npm install --save-dev -D cypress-iframe@1.0.1
RUN npm install --save-dev cypress@>=6.2.0
RUN npm install --save cypress@>=6.2.0
RUN npm install --save-dev @types/cypress@^1.1.0
RUN npm install --save-dev mochawesome@6.3.1
RUN npm install --save-dev mocha@>=7

# Dependencies
RUN npm install

ADD run.sh /run.sh
RUN chmod +x /run.sh










CMD /run.sh

