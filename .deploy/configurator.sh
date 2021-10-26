#!/bin/bash -x
# This file comes from the infra repo. 
# If you wish to have a dedicated different file instead of this one, add "CUSTOM_CONFIGURATOR" env variable to the streamliner step of your development build, with the value "true"

# Run service-specific pre-command if one exists
[ -r /configuratorPreCommand.sh ] && . /configuratorPreCommand.sh 1>&2

if [ -r /configuratorCommand.sh ] ; then
  . /configuratorCommand.sh 1>&2
else
  # Prepare configurator directory with all the keys from configmap and secrets
  ls /configmap | grep -v CONFIGURATOR_RELEASE_REPLACE | grep ^CONFIGURATOR_ >/dev/null && {
    mkdir -p /tmp/configurator
    for key in /configmap/* /secret-mounts/*/*  ; do cat $key > "/tmp/configurator/${key##*/}" ; done
  }

  # Perform file copying first
  [ -z "$CONFIGURATOR_COPY_FIRST" ] || {
    echo "$CONFIGURATOR_COPY_FIRST" | while read -r src tgt ; do
      cp -rvL $src $tgt
    done
  }

  # Perform generic replacements in files
  [ -z "$CONFIGURATOR_REPLACE" ] || {
    echo "$CONFIGURATOR_REPLACE" | while read -r src oldval newval ; do
      [ -z "$src" ] || [ -z "${oldval}" ] || find $src -type f -exec sed -i "s~${oldval}~${newval}~g" {} \;
    done
  }

  # Configure release
  export RELEASE=$(</RELEASE)
  [ -r /releases ] && . /releases
  releaseName="RELEASE_${RELEASE}"
  [ -z "${!releaseName}" ] || {
    TS=$(</TS)
    srcRelease="444.222.${TS}"
    tgtRelease=`echo "${!releaseName}" | sed 's~^v~~'`
    [ -z "$CONFIGURATOR_RELEASE_REPLACE"] || {
      echo "$CONFIGURATOR_RELEASE_REPLACE" | while read -r src ; do
        find $src -type f -exec sed -i "s~$srcRelease~$tgtRelease~g" {} \;
      done
    }
    export RELEASE=$tgtRelease
    echo $RELEASE > /RELEASE
  }

  # Perform env replacements in files
  [ -z "$CONFIGURATOR_ENV_REPLACE" ] || {
    echo "$CONFIGURATOR_ENV_REPLACE" | while read -r src key tmpl ; do
      if [ "$key" == "ALL" ] ; then
        for key in `ls /tmp/configurator/ | grep -v '^CONFIGURATOR' | grep -v '_CONF$' | grep -v '*'` ; do
          value=$(</tmp/configurator/$key)
          find $src -type f -exec sed -i "s~___${key}___~${value}~g" {} \;
        done
      elif [ "$key" == "URLS" ] ; then
        for key in `ls /tmp/configurator/ | grep  '_URL$'` ; do
          value=$(</tmp/configurator/$key)
          find $src -type f -exec sed -i "s~___${key}___~${value}~g" {} \;
        done
      elif [ ! -z "$src" ] ; then
        if [ "$key" == "RELEASE" ] ; then
          value=$RELEASE
        else
          value=$(</tmp/configurator/$key)
        fi
        [ -z "$tmpl" ] || value=`echo $tmpl | sed "s~___${key}___~${value}~"`
        find $src -type f -exec sed -i "s~___${key}___~${value}~g" {} \;
      fi
    done
  }

  # Perform env remapping in live env
  [ -z "$CONFIGURATOR_ENV_REMAP" ] || {
    cat /dev/null > /gonfigurator_remap.sh
    echo "$CONFIGURATOR_ENV_REMAP" | while read -r src tgt tmpl ; do
      if [ "$src" == "RELEASE" ] ; then
        value=$RELEASE
      else
        value=$(</tmp/configurator/$src)
      fi
      [ -z "$tmpl" ] || value=`echo $tmpl | sed "s~___${src}___~${value}~"`
      [ -z "$src" ] || [ -z "$tgt" ] || echo "export ${tgt}=$value" >> /tmp/configurator_remap.sh
    done
    . /tmp/configurator_remap.sh
  }

  # Perform file copying last
  [ -z "$CONFIGURATOR_COPY_LAST" ] || {
    echo "$CONFIGURATOR_COPY_LAST" | while read -r src tgt ; do
      cp -rvL $src $tgt
    done
  }

  echo -n "$RELEASE"
fi

# Run service-specific pre-command if one exists
[ -r /configuratorPostCommand.sh ] && . /configuratorPostCommand.sh 1>&2




