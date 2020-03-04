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
Start up all services: postgres, solr, fcrepo, radis, worker, web, nginx, activemq, karaf and graphdb
```shell
$ docker-compose up -d
```
Start individual service
```shell
$ docker-compose up -d ${service}
```
Use command ```$ docker-compose ps -a``` to check docker container

If container already exists, use following command to start the service
```shell
$ docker-compose start ${service}
```
## Jupiter

### Setup Database
```shell
$ docker-compose run web rails db:migrate
$ docker-compose run web rails db:setup
```

### UI
```shell
http://localhost
```

### Fedora
```shell
http://localhost:8080/fcrepo
```

### OAI Provider
```shell
http://localhost:8080/fcrepo/rest/oai?verb=Identify
```

### Solr
```shell
http://localhost:8983
```

## ActiveMQ

### UI
```shell
http://localhost:8161
login: admin/admin
```

## GraphDB

### Setup Repositories

```shell
    $ docker exec -it triplestore_graphdb_1 /opt/graphdb/init/create_repositories.sh
    $ docker-compose stop graphdb
    $ sudo cp owlim.properties ./graphdb/data/repositories/fedora/storage/
    $ sudo cp owlim.properties ./graphdb/data/repositories/audit/storage/
    $ sudo cp settings.js ./graphdb/work/workbench/
    $ docker-compose start graphdb
```
  Or, run ./setup_graphdb.sh
```shell
    $ ./setup_graphdb.sh
```

### Import Data
- Create directory ./graphdb/import
```shell
    $ mkdir ./graphdb/import
```
- Copy export data to ./graphdb/import
```shell
    $ cp statements.trig ./graphdb/import
```
- Use Graphdb Workbrench to import data on the server

### UI
```shell
http://localhost:7200
```

## Karaf

### UI
```shell
http://localhost:8181/hawtio
login: karaf/karaf
```

### Reindex Triplestore
```shell
$ curl -XPOST localhost:9080/reindexing/uat -H"Content-Type: application/json"   -d '["broker:queue:triplestore.reindex"]'
```

### Reindex Solr
```shell
$ curl -XPOST localhost:9080/reindexing/uat -H"Content-Type: application/json"   -d '["broker:queue:solr.reindex"]'
```

### Reindex Fixity
```shell
$ curl -XPOST localhost:9080/reindexing/uat -H"Content-Type: application/json"   -d '["broker:queue:fixity"]'
```

### Reindex Serialization
```shell
$ curl -XPOST localhost:9080/reindexing/uat -H"Content-Type: application/json"   -d '["broker:queue:serialization"]'
```

### Reindex All 
```shell
$ curl -XPOST localhost:9080/reindexing/uat -H"Content-Type: application/json"   -d '["broker:queue:triplestore.reindex", "broker:queue:solr.reindex", "broker:queue:fixity", "broker:queue:serialization"]'
```
