# Triplestore Stack
Rails, Nginx, Redis, PostgreSQL, Solr, Fedora, ActiveMQ, Karaf and GraphDB

## GraphDB
### Setup Repositoreis

```shell
    $ docker exec -it triplestore_graphdb_1 /opt/graphdb/init/create_repositories.sh
    $ docker-compose stop graphdb
    $ sudo cp owlim.properties ./graphdb/data/repositories/fedora/storage/
    $ sudo cp owlim.properties ./graphdb/data/repositories/audit/storage/
    $ sudo cp settings ./graphdb/work/workbench/
    $ docker-compose start graphdb
```
## Karaf
### Reindex Fedora Triplestore

```shell
$ curl -XPOST localhost:9080/reindexing/uat -H"Content-Type: application/json"   -d '["broker:queue:triplestore.reindex"]'
```