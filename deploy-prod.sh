#!/bin/bash
npm install
NODE_ENV='production' npm run build
set -v
aws s3 sync src/img s3://example.com/img --exclude ".DS_Store" --exclude "website/*" --region="us-west-2" --cache-control max-age=86400
aws s3 sync dist/css/app s3://example.com/css/app --delete --region="us-west-2" --cache-control max-age=86400
aws s3 sync dist/js/app s3://example.com/js/app --delete --region="us-west-2" --cache-control max-age=86400
aws s3 sync dist/. s3://example.com/ --exclude '*' --include 'app.html' --region="us-west-2" --cache-control max-age=300
