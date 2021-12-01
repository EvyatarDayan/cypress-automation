#!/bin/bash

function die {
  echo $1
  exit 1
}

printf 'Content-type: text/html\n\n'

for p in ${QUERY_STRING//&/ };do kvp=( ${p/=/ } ); k=`echo ${kvp[0]} | awk '{ print toupper($0) }'`; v=${kvp[1]};eval $k=$v;done

[ -z "$JOB" ] && die "Missing job name"

cd /app
#git checkout -f master >/dev/null
git pull > /dev/null

node cypress-run-crawl-jobs.js $JOB 2>&1
