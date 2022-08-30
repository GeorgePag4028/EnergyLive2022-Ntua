#!/bin/sh -e
docker compose -f docker-compose.yml rm -sfv
docker image prune -a
