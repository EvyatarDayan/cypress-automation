#!/bin/bash
/usr/bin/gcsfuse -o allow_other  --file-mode=666 --dir-mode=777 $CYPRESS_AUTOMATION_BUCKET /usr/share/nginx/reports
cat /secret-mounts/gh-key/GH_KEY > ~/.ssh/id_rsa
echo "" >> ~/.ssh/id_rsa
chmod 400 ~/.ssh/id_rsa
. /configurator.sh
cd /app
# git checkout -f master
git pull
spawn-fcgi -s /var/run/fcgiwrap.socket /usr/sbin/fcgiwrap && chown www-data /var/run/fcgiwrap.socket && nginx -g "daemon off;"
#nginx -g "daemon off;"
fusermount -u /usr/share/nginx/reports
