#!/bin/bash
npm install
NODE_ENV='qa' npm run qa-build
set -v
aws s3 sync src/img s3://qa.example.com/img --exclude ".DS_Store" --exclude "website/*" --region="us-west-2" --cache-control max-age=600
aws s3 sync dist/css/app s3://qa.example.com/css/app --delete --region="us-west-2" --cache-control max-age=600
aws s3 sync dist/js/app s3://qa.example.com/js/app --delete --region="us-west-2" --cache-control max-age=600
aws s3 sync dist/. s3://qa.example.com/ --exclude '*' --include 'app.html' --region="us-west-2" --cache-control max-age=60
