# Triplestore Stack
Rails, Nginx, Redis, PostgreSQL, Solr, Fedora, ActiveMQ, Karaf and GraphDB
## GraphDB
### Initailize
```shell
    $ docker exec -it triplestore_graphdb_1 /opt/graphdb/init/create_repositories.sh
    $ docker-compose restart graphdb
```
