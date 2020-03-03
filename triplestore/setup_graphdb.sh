#!/bin/bash
docker exec -it triplestore_graphdb_1 /opt/graphdb/init/create_repositories.sh
docker-compose stop graphdb
sudo cp owlim.properties ./graphdb/data/repositories/fedora/storage/
sudo cp owlim.properties ./graphdb/data/repositories/audit/storage/
sudo cp settings.js ./graphdb/work/workbench/
docker-compose start graphdb