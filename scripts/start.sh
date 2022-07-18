#!/usr/bin/env bash

set -e
echo ">>> Starting app in $NODE_ENV"


if [ "$NODE_ENV" == "production" ] || [ "$NODE_ENV" == "staging" ] ; then
  echo ">>> run commands for production and staging"
  npm run start:prod
elif [ "$NODE_ENV" == "test" ]; then
  npm run test
else
  npm run start:dev
fi
