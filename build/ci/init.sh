#!/bin/bash -e

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

npm version
npm install --no-progress
