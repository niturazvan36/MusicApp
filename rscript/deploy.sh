#!/bin/bash

set -e
STAGE=$1

if [[ -z $STAGE ]]
then
    echo "Please provide a valid stage - dev or prod. deploy.sh STAGE"
    exit 1
elif [[ $STAGE = prod ]]
then
    DOMAIN_NAME='http://nitu.s3-website.eu-central-1.amazonaws.com'
    ANGULAR_CONFIG='production'
elif [[ $STAGE = dev ]]
then
    DOMAIN_NAME='http://nitu.s3-website.eu-central-1.amazonaws.com'
    ANGULAR_CONFIG='development'
else 
    echo "Invalid stage $STAGE"
    exit 1
fi

echo "Deploying ..."

rm -rf sls/dist/

cd ../nitu
ng build --configuration $ANGULAR_CONFIG

aws s3 sync dist/nitu/browser/ s3://nitu