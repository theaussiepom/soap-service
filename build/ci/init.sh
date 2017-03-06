#!/bin/bash -e

printf "//registry.npmjs.org/:_authToken=$NPM_TOKEN\\n" > ~/.npmrc

npm version
npm install --no-progress
