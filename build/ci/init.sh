#!/bin/bash -e

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

set -x

npm version
npm install --no-progress

# Change Instanbul reporting to text mode
sed -i 's/- html/- text/g' .istanbul.yml

set +x
