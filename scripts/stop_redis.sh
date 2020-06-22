#!/bin/bash

CONTAINER=$(docker ps -q --filter ancestor=redis)
docker stop $CONTAINER
docker rm $CONTAINER