#!/bin/bash -e
set -x

npm run build
npm run test:unit:coverage
npm run test:spec:features:coverage -- --tags 'not @wip'

set +x
