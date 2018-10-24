#!/bin/bash -e
set -x

npm run build
npm run test:unit:coverage
npm run test:spec:features:coverage -- --tags 'not @wip'

PKG_VERSION=`node -p "require('./package.json').version"`
VERSION=`node_modules/.bin/semver $PKG_VERSION -i prerelease --preid dev | sed "s/[0-9]\+$/$BITBUCKET_BUILD_NUMBER/"`
npm version $VERSION --git-tag-version false

TAG=`echo $BITBUCKET_BRANCH | tr '[:upper:]' '[:lower:]' | sed -e 's_/_-_g' -e 's/[^a-zA-Z0-9-]//g'`

npm publish --tag $TAG
npm access grant read-only minfos:read-only

echo "Published dev package with tag:" $TAG

set +x
