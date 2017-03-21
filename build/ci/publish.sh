#!/bin/bash -e
set -x

# Look for the current commit to have the message from standard-version with the format "chore(release): x.x.x"
RELEASE_VERSION=$(git log -1 --pretty="%B" | perl -ne 'if(m/chore\(release\): ([0-9.]+)/){ print $1; }')

if [ -n "$RELEASE_VERSION" ]; then
  PUBLISH_VERSION=$(node -p -e "require('./package.json').version")

  # Verify that the version in the package matches that from the message
  if [ "$RELEASE_VERSION" != "$PUBLISH_VERSION" ]; then
    echo "Versions do not match: $RELEASE_VERSION vs $PUBLISH_VERSION"
    exit 1
  fi

  # Publish to NPM
  echo "Publishing: $PUBLISH_VERSION"
  npm publish
  npm access grant read-only minfos:read-only

fi

set +x
