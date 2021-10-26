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
git checkout -f master
git pull

CONF=`cat .env-config/${CLUSTER}.${NAMESPACE}.conf`
TS=`date "+%Y%m%d%H%M%S%N"`
tmpConfFile="${TS}${CLUSTER}${NAMESPACE}${SERVICE}${CLASS}"
cat /dev/null > $tmpConfFile
for key in `echo -n $CONF | jq -r 'keys[]' | grep _PUBLIC_URL` ; do
  value=`echo -n $CONF | jq -r ".${key}"`
  echo "${key}=\"${value}\"" >> $tmpConfFile
done

. $tmpConfFile
rm -f tmpConfFile

# env | grep _PUBLIC_URL
TEST_SERVICE=$SERVICE TEST_CLASS=$CLASS node cypress-run-tests.js $SERVICE $CLASS