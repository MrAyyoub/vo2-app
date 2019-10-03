#!/bin/sh
if [ -d "dist" ]; then
  rm -rf dist/
fi
ng build --prod
if [ -d "dist" ]; then
  cd dist/architectui-angular-pro/
  aws s3 sync . s3://viewly-one-website
  aws cloudfront create-invalidation --distribution-id ETOZ8PBZB3ISX --paths /index.html
fi

# while true; do echo 'sleeping'; sleep 3600; done
