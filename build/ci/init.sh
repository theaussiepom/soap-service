#!/bin/bash -e

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

set -x

npm version
npm install --no-progress

set +x
