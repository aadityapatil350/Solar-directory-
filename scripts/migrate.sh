#!/bin/bash
set -a
source .env.local
set +a
npx prisma migrate dev --name add_istest_to_listings
