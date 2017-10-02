#!/bin/bash -e

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

set -x

npm version
npm update --no-progress

set +x
