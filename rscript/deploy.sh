#!/bin/bash

set -e
STAGE=$1

if [[ -z $STAGE ]]
then
    echo "Please provide a valid stage - dev or prod. deploy.sh STAGE"
    exit 1
elif [[ $STAGE = prod ]]
then
    DOMAIN_NAME=''
    ANGULAR_CONFIG='production'
elif [[ $STAGE = dev ]]
then
    DOMAIN_NAME=''
    ANGULAR_CONFIG='development'
else 
    echo "Invalid stage $STAGE"
    exit 1
fi

echo Domain name: $DOMAIN_NAME
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[*].{id:Id,alias:Aliases.Items[0]}[?alias=='$DOMAIN_NAME'].id" --output text)

echo "Deploying ..."

rm -rf sls/dist/

cd ../nitu
ng build --configuration $ANGULAR_CONFIG

aws s3 sync dist/angular..sample-app/ s3://...
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"