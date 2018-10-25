#!/bin/bash -e
set -x

# Ensure that git has a configured user
if [ -z $(git config --global user.name) ]; then
  git config --global user.name "Unknown"
  git config --global user.email "unknown@example.org"
fi

# Merge the source branch into master and verify there are no merge-conflicts
git checkout master

if [ $? != 0 ]; then
  git remote set-branches --add origin master
  git fetch origin master
  git checkout master
fi

git merge --no-ff --no-commit $BITBUCKET_COMMIT
if [[ -n $(git ls-files -u) ]]; then exit 1; fi

set +x
