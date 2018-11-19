#!/bin/bash -e
set -x

npm run build
mkdir test-results
npm install mocha-junit-reporter cucumber-junit-convert

npm run test:unit:coverage -- --reporter mocha-junit-reporter --reporter-options mochaFile=./test-results/unit.xml

set +e
npm run test:spec:features:coverage -- --tags 'not @wip' --format progress --format json:test-results/spec-features.json
WIP_SPECS_PASS=$?
set -e
node build/ci/generate-spec-features-test-results.js
if [[ $WIP_SPECS_PASS != 0 ]]; then exit $WIP_SPECS_PASS; fi

PKG_VERSION=`node -p "require('./package.json').version"`
VERSION=`node_modules/.bin/semver $PKG_VERSION -i prerelease --preid dev | sed "s/[0-9]\+$/$BITBUCKET_BUILD_NUMBER/"`
npm version $VERSION --git-tag-version false

if [ -n "$BITBUCKET_BRANCH" ];  then
  TAG=`echo $BITBUCKET_BRANCH | tr '[:upper:]' '[:lower:]' | sed -e 's_/_-_g' -e 's/[^a-zA-Z0-9-]//g'`
  npm publish --tag $TAG
  echo "Published dev package with tag:" $TAG
else
  npm publish
  echo "Published dev package with no tag"
fi

npm access grant read-only minfos:read-only

set +x
