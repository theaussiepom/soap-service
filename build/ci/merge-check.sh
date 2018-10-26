#!/bin/bash -e
set -x

# Ensure that git has a configured user
if [ -z $(git config --global user.name) ]; then
  git config --global user.name "Unknown"
  git config --global user.email "unknown@example.org"
fi


# Merge the source branch into master
if ! git checkout master; then

  set +x
  REPOSITORY_OAUTH_ACCESS_TOKEN=`node build/ci/get-access-token.js`
  git remote set-url origin https://x-token-auth:$REPOSITORY_OAUTH_ACCESS_TOKEN@bitbucket.org/minfos/ref-boilerplate-core.git
  set -x

  git remote set-branches --add origin master
  git fetch origin master
  git checkout master
fi

# Verify there are no merge-conflicts
git merge --no-ff --no-commit $BITBUCKET_COMMIT
if [[ -n $(git ls-files -u) ]]; then exit 1; fi

set +x
