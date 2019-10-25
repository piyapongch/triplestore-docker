# Triplestore Stack
This is a complete end-to-end Triplestore stack. It includes Jupiter stack as a frontend application, Fedora stack as a repository and triplstore stack, ActiveMQ, Karaf, Fedora's Camel components and GraphDB as a triplstore.

## Services

### Frontend
- Rails
- Nginx 
- Redis 
- PostgreSQL 
- Solr
### Repository
- Tomcat8
- Fedora4
### Backend
- ActiveMQ
- Karaf
  - fcrepo-service-activemq
  - fcrepo-indexing-triplestore
  - fcrepo-fixity
  - fcrepo-audit-triplestore
  - fcrepo-serialization
  - fcrepo-reindexing
  - hawtio
  - jolokia
- GraphDB
  - Lucene Connector

## Startup

```shell
$ docker-compose up -d
```

## Jupiter
### Setup Database

```shell
$ docker-compose run web rails db:migrate
$ docker-compose run web rails db:setup
```

## GraphDB
### Setup Repositories

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