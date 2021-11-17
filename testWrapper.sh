#!/bin/bash

function die {
  echo $1
  exit 1
}

printf 'Content-type: text/html\n\n'

for p in ${QUERY_STRING//&/ };do kvp=( ${p/=/ } ); k=`echo ${kvp[0]} | awk '{ print toupper($0) }'`; v=${kvp[1]};eval $k=$v;done

[ -z "$CLUSTER" ] && die "Missing cluster"
[ -z "$NAMESPACE" ] && die "Missing namespace"
[ -z "$SERVICE" ] && die "Missing service"
[ -z "$CLASS" ] && die "Missing class"

cd /app
git checkout -f master >/dev/null
git pull > /dev/null

CONF=`cat .env-config/${CLUSTER}.${NAMESPACE}.conf`
TS=`date "+%Y%m%d%H%M%S%N"`
tmpConfFile="${TS}${CLUSTER}${NAMESPACE}${SERVICE}${CLASS}"
cat /dev/null > $tmpConfFile
for key in `echo -n $CONF | jq -r 'keys[]' | grep _PUBLIC_URL` ; do
  value=`echo -n $CONF | jq -r ".${key}"`
  echo "export CYPRESS_${key}=\"${value}\"" >> $tmpConfFile
done

. $tmpConfFile
rm -f tmpConfFile

export CYPRESS_TEST_SERVICE=$SERVICE 
export CYPRESS_TEST_CLASS=$CLASS 
# echo "<br /><br />"
# env | grep CYPRESS | sort | sed ':a;N;$!ba;s#\n#<br />#g;s#^<br />##g'
node cypress-run-tests.js $SERVICE $CLASS
