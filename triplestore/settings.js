{
  "users" : {
    "admin" : {
      "username" : "admin",
      "password" : "fb614164d8d58429e9d90d380b90f382d33cd0f3e3a63f90b902471739936554",
      "grantedAuthorities" : [ "ROLE_ADMIN" ],
      "appSettings" : {
        "DEFAULT_INFERENCE" : true,
        "DEFAULT_SAMEAS" : true,
        "EXECUTE_COUNT" : true
      },
      "dateCreated" : 1515914135802
    }
  },
  "queries" : {
    "Find Objects by LastModified" : {
      "name" : "Find Objects by LastModified",
      "body" : "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX fedora: <http://fedora.info/definitions/v4/repository#>\nselect ?s ?p ?date \nwhere {\n  ?s fedora:lastModified ?date .\n  FILTER (?date > \"2018-04-13T00:00:00.000Z\"^^xsd:dateTime && ?date < \"2018-04-13T23:59:59.999Z\"^^xsd:dateTime)\n}\n"
    },
    "List All FixityServices" : {
      "name" : "List All FixityServices",
      "body" : "SELECT ?s ?p ?o \nWHERE {\n  ?s \t<http://fedora.info/definitions/v4/repository#hasFixityService> ?o .\n}\nLIMIT 50\n"
    },
    "List All Predicates" : {
      "name" : "List All Predicates",
      "body" : "SELECT ?p (COUNT(*) AS ?count)\nWHERE {\n   ?s ?p ?o .\n}\nGROUP BY ?p\nORDER by ?p\n"
    },
    "Add statements" : {
      "name" : "Add statements",
      "body" : "PREFIX dc: <http://purl.org/dc/elements/1.1/>\nINSERT DATA\n      {\n      GRAPH <http://example> {\n          <http://example/book1> dc:title \"A new book\" ;\n                                 dc:creator \"A.N.Other\" .\n          }\n      }"
    },
    "Lucene: Create pcdm_object connector" : {
      "name" : "Lucene: Create pcdm_object connector",
      "body" : "PREFIX :<http://www.ontotext.com/connectors/lucene#>\nPREFIX inst:<http://www.ontotext.com/connectors/lucene/instance#>\nINSERT DATA {\n\tinst:pcdm_object :createConnector '''\n{\n  \"fields\": [\n    {\n      \"fieldName\": \"title\",\n      \"propertyChain\": [\n        \"http://purl.org/dc/terms/title\"\n      ],\n      \"indexed\": true,\n      \"stored\": true,\n      \"analyzed\": true,\n      \"multivalued\": true,\n      \"facet\": true\n    },\n    {\n      \"fieldName\": \"creator\",\n      \"propertyChain\": [\n        \"http://purl.org/dc/elements/1.1/creator\"\n      ],\n      \"indexed\": true,\n      \"stored\": false,\n      \"analyzed\": true,\n      \"multivalued\": true,\n      \"facet\": true\n    },\n    {\n      \"fieldName\": \"subject\",\n      \"propertyChain\": [\n        \"http://purl.org/dc/elements/1.1/subject\"\n      ],\n      \"indexed\": true,\n      \"stored\": false,\n      \"analyzed\": true,\n      \"multivalued\": true,\n      \"facet\": true\n    }\n  ],\n  \"types\": [\n    \"http://pcdm.org/models#Object\"\n  ],\n  \"stripMarkup\": false\n}\n''' .\n}"
    },
    "List All Versions" : {
      "name" : "List All Versions",
      "body" : "SELECT ?s ?p ?o \nWHERE {\n  ?s \t<http://fedora.info/definitions/v4/repository#hasVersions> ?o .\n}\nLIMIT 50\n"
    },
    "Find Triple using RegEx" : {
      "name" : "Find Triple using RegEx",
      "body" : "select ?s ?p ?o\nwhere { \n  ?s ?p ?o .\n  FILTER regex(str(?o), \"alberta\", \"i\")\n}\n"
    },
    "Lucene: Search using pcdm_object" : {
      "name" : "Lucene: Search using pcdm_object",
      "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\nPREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>\nPREFIX dcterms: <http://purl.org/dc/terms/>\nPREFIX dc: <http://purl.org/dc/elements/1.1/>\nSELECT ?entity ?t ?c ?s where {\n  ?search a inst:pcdm_object ;\n      :query \"creator:john OR title:alberta OR subject:Bacteria\" ;\n      # Fields for sorting must be defined with multivalued = false. \n      # :orderBy \"creator\";\n      :offset 2;\n      :limit 10;\n      :entities ?entity .\n      ?entity dcterms:title ?t .\n      ?entity dc:creator ?c .\n      ?entity dc:subject ?s .\n      ?entity :score ?score\n}\nlimit 100"
    },
    "Lucene: Basic Facets Queries" : {
      "name" : "Lucene: Basic Facets Queries",
      "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\nPREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>\n\nSELECT ?facetName ?facetValue ?facetCount WHERE {\n  # note empty query is allowed and will just match all documents, hence no :query\n  ?r a inst:pcdm_object ;\n    :facetFields \"subject,creator\" ;\n    :facets _:f .\n  _:f :facetName ?facetName .\n  _:f :facetValue ?facetValue .\n  _:f :facetCount ?facetCount .\n}\n# LIMIT 100\n"
    },
    "List Explicit Context" : {
      "name" : "List Explicit Context",
      "body" : "select ?s ?p ?o\nfrom <http://www.ontotext.com/explicit>\nwhere {\n    ?s ?p ?o .\n} order by ?s \nlimit 100"
    },
    "List All Departments" : {
      "name" : "List All Departments",
      "body" : "PREFIX ual: <http://terms.library.ualberta.ca/>\nselect ?o (count(*) as ?n) where { \n\t?s ual:department ?o .\n}\ngroup by ?o\norder by ?o\n"
    },
    "List All MineTypes" : {
      "name" : "List All MineTypes",
      "body" : "SELECT ?s ?p ?o \nWHERE {\n  ?s \t<http://fedora.info/definitions/v4/repository#mimeType> ?o .\n}\nLIMIT 50\n"
    },
    "Lucene: Snippet extraction" : {
      "name" : "Lucene: Snippet extraction",
      "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\nPREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>\n\nSELECT ?entity ?snippetField ?snippetText {\n  ?search a inst:pcdm_object ;\n      :query \"title:alberta\" ;\n      :entities ?entity .\n  ?entity :snippets _:s .\n  _:s :snippetField ?snippetField ;\n     :snippetText ?snippetText .\n}"
    },
    "Lucene: List Connectors" : {
      "name" : "Lucene: List Connectors",
      "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\n\nSELECT ?cntUri ?cntStr {\n  ?cntUri :listConnectors ?cntStr .\n}"
    },
    "Count Number of Triples" : {
      "name" : "Count Number of Triples",
      "body" : "SELECT (COUNT(*) AS ?count)\nWHERE {\n  ?s ?p ?o .\n}\n"
    },
    "SPARQL Select template" : {
      "name" : "SPARQL Select template",
      "body" : "SELECT ?s ?p ?o\nWHERE {\n\t?s ?p ?o .\n} LIMIT 100"
    },
    "Lucene: Drop pcdm_object connector" : {
      "name" : "Lucene: Drop pcdm_object connector",
      "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\nPREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>\nINSERT DATA {\n  inst:pcdm_object :dropConnector \"\" .\n}"
    },
    "Find Objects by ContentModel" : {
      "name" : "Find Objects by ContentModel",
      "body" : "PREFIX dc: <http://purl.org/dc/elements/1.1/>\nPREFIX fedora: <http://fedora.info/definitions/v4/repository#>\nPREFIX model: <info:fedora/fedora-system:def/model#>\nselect ?s ?p ?o\nwhere {\n    ?s model:hasModel \"IRItem\" .\n    ?s ?p ?o .\n}\norder by ?s\nlimit 100"
    },
    "Remove statements" : {
      "name" : "Remove statements",
      "body" : "PREFIX dc: <http://purl.org/dc/elements/1.1/>\nDELETE DATA\n{\nGRAPH <http://example> {\n    <http://example/book1> dc:title \"A new book\" ;\n                           dc:creator \"A.N.Other\" .\n    }\n}"
    },
    "Find LastModified Items" : {
      "name" : "Find LastModified Items",
      "body" : "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX fedora: <http://fedora.info/definitions/v4/repository#>\nPREFIX model: <info:fedora/fedora-system:def/model#>\nselect ?s ?p ?date \nwhere {\n  ?s fedora:lastModified ?date .\n  ?s model:hasModel \"IRItem\" .\n#  FILTER (?date > \"2018-04-13T00:00:00.000Z\"^^xsd:dateTime && ?date < \"2018-04-13T23:59:59.999Z\"^^xsd:dateTime)\n}\norder by desc(?date)\nlimit 100"
    },
    "Lucene: Total hits" : {
      "name" : "Lucene: Total hits",
      "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\nPREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>\n\nSELECT ?totalHits {\n    ?r a inst:pcdm_object ;\n       :query \"title:alberta\" ;\n       :totalHits ?totalHits .\n}\n"
    },
    "Find by ContentModel and LastModified" : {
      "name" : "Find by ContentModel and LastModified",
      "body" : "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX fedora: <http://fedora.info/definitions/v4/repository#>\nPREFIX model: <info:fedora/fedora-system:def/model#>\nselect ?s ?p ?date \nwhere {\n  ?s fedora:lastModified ?date .\n  ?s model:hasModel \"IRItem\"\n  FILTER (?date > \"2018-04-01T00:00:00.000Z\"^^xsd:dateTime && ?date < \"2018-04-06T23:59:59.999Z\"^^xsd:dateTime)\n}"
    },
    "Clear graph" : {
      "name" : "Clear graph",
      "body" : "CLEAR GRAPH <http://example>"
    },
    "Count Triple by ContentModels" : {
      "name" : "Count Triple by ContentModels",
      "body" : "SELECT ?o (COUNT(*) AS ?count)\nWHERE {\n  ?s <info:fedora/fedora-system:def/model#hasModel> ?o .\n}\nGROUP BY ?o\n"
    },
    "Find Last Modified Events" : {
      "name" : "Find Last Modified Events",
      "body" : "PREFIX premis: <http://www.loc.gov/premis/rdf/v1#>\nselect ?s ?p ?d\nwhere {\n  ?s premis:hasEventDateTime ?d .\n}\norder by desc(?d)\nlimit 100"
    },
    "Lucene: Connector status check" : {
      "name" : "Lucene: Connector status check",
      "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\n\nSELECT ?cntUri ?cntStatus {\n  ?cntUri :connectorStatus ?cntStatus .\n}"
    },
    "Delete Object by ContentModel" : {
      "name" : "Delete Object by ContentModel",
      "body" : "DELETE\nWHERE { \n  ?s <info:fedora/fedora-system:def/model#hasModel> \"ActiveFedora::DirectContainer\"; \n  ?p ?o .\n}\n"
    }
  },
  "properties" : {
    "current.location" : "",
    "security.enabled" : "true",
    "security.free.access" : "true",
    "security.free.access.authorities" : "WRITE_REPO_audit,READ_REPO_audit,WRITE_REPO_fedora,READ_REPO_fedora,WRITE_REPO_hn_fedora_data,READ_REPO_hn_fedora_data,WRITE_REPO_hn_fedora_data_export,READ_REPO_hn_fedora_data_export",
    "security.free.access.settings" : "DEFAULT_INFERENCE=true,DEFAULT_SAMEAS=true,IGNORE_SHARED_QUERIES=false,EXECUTE_COUNT=true"
  },
  "locations" : {
    "" : {
      "location" : "",
      "password" : null,
      "username" : null,
      "superadminSecret" : null,
      "defaultRepository" : null
    }
  },
  "import.local" : { },
  "import.server" : {
    "hn_fedora_data;;statements.trig" : {
      "name" : "statements.trig",
      "status" : "DONE",
      "message" : "Imported successfully in 26m 53s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/statements.trig",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1583269073580,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "hn_fedora_data_export;;hn_fedora_data_export.trig.gz" : {
      "name" : "hn_fedora_data_export.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 25m 6s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/hn_fedora_data_export.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1583512798050,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "fedora;;fedora-2020-03-06T09:10:40-0700.trig.gz" : {
      "name" : "fedora-2020-03-06T09:10:40-0700.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 1h 2m 28s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/fedora-2020-03-06T09:10:40-0700.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1583515141213,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "fedora;;fedora-2020-03-31T09:33:29-0600.trig.gz" : {
      "name" : "fedora-2020-03-31T09:33:29-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 8m 19s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/fedora-2020-03-31T09:33:29-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1585671250626,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "audit;;audit-2020-03-31T10:46:00-0600.trig.gz" : {
      "name" : "audit-2020-03-31T10:46:00-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 7m 47s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/audit-2020-03-31T10:46:00-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1585674241663,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "fedora;;fedora-2020-03-31T10:46:00-0600.trig.gz" : {
      "name" : "fedora-2020-03-31T10:46:00-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 10m 18s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/fedora-2020-03-31T10:46:00-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1585675909166,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "fedora;;fedora-2020-04-01T10:11:26-0600.trig.gz" : {
      "name" : "fedora-2020-04-01T10:11:26-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 12m 1s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/fedora-2020-04-01T10:11:26-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1585770596508,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "audit;;audit-2020-04-01T10:11:26-0600.trig.gz" : {
      "name" : "audit-2020-04-01T10:11:26-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 53s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/audit-2020-04-01T10:11:26-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1585771712094,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "fedora;;fedora-2020-04-07T08:10:48-0600.trig.gz" : {
      "name" : "fedora-2020-04-07T08:10:48-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 11m 22s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/fedora-2020-04-07T08:10:48-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1586270487696,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "audit;;audit-2020-04-07T08:10:48-0600.trig.gz" : {
      "name" : "audit-2020-04-07T08:10:48-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 1m 10s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/audit-2020-04-07T08:10:48-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1586271961979,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "fedora;;fedora-2020-04-10T11:50:07-0600.trig.gz" : {
      "name" : "fedora-2020-04-10T11:50:07-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 8m 42s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/fedora-2020-04-10T11:50:07-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1586542030844,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "audit;;audit-2020-04-10T11:50:07-0600.trig.gz" : {
      "name" : "audit-2020-04-10T11:50:07-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 46s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/audit-2020-04-10T11:50:07-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1586543008689,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "fedora;;fedora-2020-04-12T14:09:06-0600.trig.gz" : {
      "name" : "fedora-2020-04-12T14:09:06-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 7m 6s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/fedora-2020-04-12T14:09:06-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1586722698167,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "fedora;;fedora-2020-04-15T10:56:07-0600.trig.gz" : {
      "name" : "fedora-2020-04-15T10:56:07-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 10m 54s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/fedora-2020-04-15T10:56:07-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1586970392679,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "audit;;audit-2020-04-15T10:56:07-0600.trig.gz" : {
      "name" : "audit-2020-04-15T10:56:07-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 3m 49s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/audit-2020-04-15T10:56:07-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1586971364251,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "fedora;;fedora-2020-04-18T11:00:14-0600.trig.gz" : {
      "name" : "fedora-2020-04-18T11:00:14-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 7m 48s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/fedora-2020-04-18T11:00:14-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1587231271339,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "audit;;audit-2020-04-18T11:00:14-0600.trig.gz" : {
      "name" : "audit-2020-04-18T11:00:14-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 45s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/audit-2020-04-18T11:00:14-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1587232286888,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "fedora;;fedora-2020-04-20T08:43:55-0600.trig.gz" : {
      "name" : "fedora-2020-04-20T08:43:55-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 9m 51s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/fedora-2020-04-20T08:43:55-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1587395588316,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    },
    "audit;;audit-2020-04-20T08:43:55-0600.trig.gz" : {
      "name" : "audit-2020-04-20T08:43:55-0600.trig.gz",
      "status" : "DONE",
      "message" : "Imported successfully in 53s.",
      "context" : null,
      "replaceGraphs" : [ ],
      "baseURI" : "file:/opt/graphdb/home/import/audit-2020-04-20T08:43:55-0600.trig.gz",
      "forceSerial" : false,
      "type" : null,
      "format" : null,
      "data" : null,
      "timestamp" : 1587396413890,
      "parserSettings" : {
        "preserveBNodeIds" : false,
        "failOnUnknownDataTypes" : false,
        "verifyDataTypeValues" : false,
        "normalizeDataTypeValues" : false,
        "failOnUnknownLanguageTags" : false,
        "verifyLanguageTags" : true,
        "normalizeLanguageTags" : false,
        "stopOnError" : true
      },
      "xrequestIdHeaders" : null
    }
  },
  "user_queries" : {
    "admin" : {
      "Find Objects by LastModified" : {
        "name" : "Find Objects by LastModified",
        "body" : "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX fedora: <http://fedora.info/definitions/v4/repository#>\nselect ?s ?p ?date \nwhere {\n  ?s fedora:lastModified ?date .\n  FILTER (?date > \"2018-04-13T00:00:00.000Z\"^^xsd:dateTime && ?date < \"2018-04-13T23:59:59.999Z\"^^xsd:dateTime)\n}\n",
        "shared" : false
      },
      "List All FixityServices" : {
        "name" : "List All FixityServices",
        "body" : "SELECT ?s ?p ?o \nWHERE {\n  ?s \t<http://fedora.info/definitions/v4/repository#hasFixityService> ?o .\n}\nLIMIT 50\n",
        "shared" : false
      },
      "List All Predicates" : {
        "name" : "List All Predicates",
        "body" : "SELECT ?p (COUNT(*) AS ?count)\nWHERE {\n   ?s ?p ?o .\n}\nGROUP BY ?p\nORDER by ?p\n",
        "shared" : false
      },
      "Add statements" : {
        "name" : "Add statements",
        "body" : "PREFIX dc: <http://purl.org/dc/elements/1.1/>\nINSERT DATA\n      {\n      GRAPH <http://example> {\n          <http://example/book1> dc:title \"A new book\" ;\n                                 dc:creator \"A.N.Other\" .\n          }\n      }",
        "shared" : false
      },
      "Lucene: Create pcdm_object connector" : {
        "name" : "Lucene: Create pcdm_object connector",
        "body" : "PREFIX :<http://www.ontotext.com/connectors/lucene#>\nPREFIX inst:<http://www.ontotext.com/connectors/lucene/instance#>\nINSERT DATA {\n\tinst:pcdm_object :createConnector '''\n{\n  \"fields\": [\n    {\n      \"fieldName\": \"title\",\n      \"propertyChain\": [\n        \"http://purl.org/dc/terms/title\"\n      ],\n      \"indexed\": true,\n      \"stored\": true,\n      \"analyzed\": true,\n      \"multivalued\": true,\n      \"facet\": true\n    },\n    {\n      \"fieldName\": \"creator\",\n      \"propertyChain\": [\n        \"http://purl.org/dc/elements/1.1/creator\"\n      ],\n      \"indexed\": true,\n      \"stored\": false,\n      \"analyzed\": true,\n      \"multivalued\": true,\n      \"facet\": true\n    },\n    {\n      \"fieldName\": \"subject\",\n      \"propertyChain\": [\n        \"http://purl.org/dc/elements/1.1/subject\"\n      ],\n      \"indexed\": true,\n      \"stored\": false,\n      \"analyzed\": true,\n      \"multivalued\": true,\n      \"facet\": true\n    }\n  ],\n  \"types\": [\n    \"http://pcdm.org/models#Object\"\n  ],\n  \"stripMarkup\": false\n}\n''' .\n}",
        "shared" : false
      },
      "List All Versions" : {
        "name" : "List All Versions",
        "body" : "SELECT ?s ?p ?o \nWHERE {\n  ?s \t<http://fedora.info/definitions/v4/repository#hasVersions> ?o .\n}\nLIMIT 50\n",
        "shared" : false
      },
      "Find Triple using RegEx" : {
        "name" : "Find Triple using RegEx",
        "body" : "select ?s ?p ?o\nwhere { \n  ?s ?p ?o .\n  FILTER regex(str(?o), \"alberta\", \"i\")\n}\n",
        "shared" : false
      },
      "Lucene: Search using pcdm_object" : {
        "name" : "Lucene: Search using pcdm_object",
        "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\nPREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>\nPREFIX dcterms: <http://purl.org/dc/terms/>\nPREFIX dc: <http://purl.org/dc/elements/1.1/>\nSELECT ?entity ?t ?c ?s where {\n  ?search a inst:pcdm_object ;\n      :query \"creator:john OR title:alberta OR subject:Bacteria\" ;\n      # Fields for sorting must be defined with multivalued = false. \n      # :orderBy \"creator\";\n      :offset 2;\n      :limit 10;\n      :entities ?entity .\n      ?entity dcterms:title ?t .\n      ?entity dc:creator ?c .\n      ?entity dc:subject ?s .\n      ?entity :score ?score\n}\nlimit 100",
        "shared" : false
      },
      "Lucene: Basic Facets Queries" : {
        "name" : "Lucene: Basic Facets Queries",
        "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\nPREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>\n\nSELECT ?facetName ?facetValue ?facetCount WHERE {\n  # note empty query is allowed and will just match all documents, hence no :query\n  ?r a inst:pcdm_object ;\n    :facetFields \"subject,creator\" ;\n    :facets _:f .\n  _:f :facetName ?facetName .\n  _:f :facetValue ?facetValue .\n  _:f :facetCount ?facetCount .\n}\n# LIMIT 100\n",
        "shared" : false
      },
      "List Explicit Context" : {
        "name" : "List Explicit Context",
        "body" : "select ?s ?p ?o\nfrom <http://www.ontotext.com/explicit>\nwhere {\n    ?s ?p ?o .\n} order by ?s \nlimit 100",
        "shared" : false
      },
      "List All Departments" : {
        "name" : "List All Departments",
        "body" : "PREFIX ual: <http://terms.library.ualberta.ca/>\nselect ?o (count(*) as ?n) where { \n\t?s ual:department ?o .\n}\ngroup by ?o\norder by ?o\n",
        "shared" : false
      },
      "List All MineTypes" : {
        "name" : "List All MineTypes",
        "body" : "SELECT ?s ?p ?o \nWHERE {\n  ?s \t<http://fedora.info/definitions/v4/repository#mimeType> ?o .\n}\nLIMIT 50\n",
        "shared" : false
      },
      "Lucene: Snippet extraction" : {
        "name" : "Lucene: Snippet extraction",
        "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\nPREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>\n\nSELECT ?entity ?snippetField ?snippetText {\n  ?search a inst:pcdm_object ;\n      :query \"title:alberta\" ;\n      :entities ?entity .\n  ?entity :snippets _:s .\n  _:s :snippetField ?snippetField ;\n     :snippetText ?snippetText .\n}",
        "shared" : false
      },
      "Lucene: List Connectors" : {
        "name" : "Lucene: List Connectors",
        "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\n\nSELECT ?cntUri ?cntStr {\n  ?cntUri :listConnectors ?cntStr .\n}",
        "shared" : false
      },
      "Count Number of Triples" : {
        "name" : "Count Number of Triples",
        "body" : "SELECT (COUNT(*) AS ?count)\nWHERE {\n  ?s ?p ?o .\n}\n",
        "shared" : false
      },
      "SPARQL Select template" : {
        "name" : "SPARQL Select template",
        "body" : "SELECT ?s ?p ?o\nWHERE {\n\t?s ?p ?o .\n} LIMIT 100",
        "shared" : false
      },
      "Lucene: Drop pcdm_object connector" : {
        "name" : "Lucene: Drop pcdm_object connector",
        "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\nPREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>\nINSERT DATA {\n  inst:pcdm_object :dropConnector \"\" .\n}",
        "shared" : false
      },
      "Find Objects by ContentModel" : {
        "name" : "Find Objects by ContentModel",
        "body" : "PREFIX dc: <http://purl.org/dc/elements/1.1/>\nPREFIX fedora: <http://fedora.info/definitions/v4/repository#>\nPREFIX model: <info:fedora/fedora-system:def/model#>\nselect ?s ?p ?o\nwhere {\n    ?s model:hasModel \"IRItem\" .\n    ?s ?p ?o .\n}\norder by ?s\nlimit 100",
        "shared" : false
      },
      "Remove statements" : {
        "name" : "Remove statements",
        "body" : "PREFIX dc: <http://purl.org/dc/elements/1.1/>\nDELETE DATA\n{\nGRAPH <http://example> {\n    <http://example/book1> dc:title \"A new book\" ;\n                           dc:creator \"A.N.Other\" .\n    }\n}",
        "shared" : false
      },
      "Find LastModified Items" : {
        "name" : "Find LastModified Items",
        "body" : "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX fedora: <http://fedora.info/definitions/v4/repository#>\nPREFIX model: <info:fedora/fedora-system:def/model#>\nselect ?s ?p ?date \nwhere {\n  ?s fedora:lastModified ?date .\n  ?s model:hasModel \"IRItem\" .\n#  FILTER (?date > \"2018-04-13T00:00:00.000Z\"^^xsd:dateTime && ?date < \"2018-04-13T23:59:59.999Z\"^^xsd:dateTime)\n}\norder by desc(?date)\nlimit 100",
        "shared" : false
      },
      "Lucene: Total hits" : {
        "name" : "Lucene: Total hits",
        "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\nPREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>\n\nSELECT ?totalHits {\n    ?r a inst:pcdm_object ;\n       :query \"title:alberta\" ;\n       :totalHits ?totalHits .\n}\n",
        "shared" : false
      },
      "Find by ContentModel and LastModified" : {
        "name" : "Find by ContentModel and LastModified",
        "body" : "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX fedora: <http://fedora.info/definitions/v4/repository#>\nPREFIX model: <info:fedora/fedora-system:def/model#>\nselect ?s ?p ?date \nwhere {\n  ?s fedora:lastModified ?date .\n  ?s model:hasModel \"IRItem\"\n  FILTER (?date > \"2018-04-01T00:00:00.000Z\"^^xsd:dateTime && ?date < \"2018-04-06T23:59:59.999Z\"^^xsd:dateTime)\n}",
        "shared" : false
      },
      "Clear graph" : {
        "name" : "Clear graph",
        "body" : "CLEAR GRAPH <http://example>",
        "shared" : false
      },
      "Count Triple by ContentModels" : {
        "name" : "Count Triple by ContentModels",
        "body" : "SELECT ?o (COUNT(*) AS ?count)\nWHERE {\n  ?s <info:fedora/fedora-system:def/model#hasModel> ?o .\n}\nGROUP BY ?o\n",
        "shared" : false
      },
      "Find Last Modified Events" : {
        "name" : "Find Last Modified Events",
        "body" : "PREFIX premis: <http://www.loc.gov/premis/rdf/v1#>\nselect ?s ?p ?d\nwhere {\n  ?s premis:hasEventDateTime ?d .\n}\norder by desc(?d)\nlimit 100",
        "shared" : false
      },
      "Lucene: Connector status check" : {
        "name" : "Lucene: Connector status check",
        "body" : "PREFIX : <http://www.ontotext.com/connectors/lucene#>\n\nSELECT ?cntUri ?cntStatus {\n  ?cntUri :connectorStatus ?cntStatus .\n}",
        "shared" : false
      },
      "Delete Object by ContentModel" : {
        "name" : "Delete Object by ContentModel",
        "body" : "DELETE\nWHERE { \n  ?s <info:fedora/fedora-system:def/model#hasModel> \"ActiveFedora::DirectContainer\"; \n  ?p ?o .\n}\n",
        "shared" : false
      },
      "Find Object Info with Content Checksum" : {
        "name" : "Find Object Info with Content Checksum",
        "body" : "select *\nwhere { \n\t?s <info:fedora/fedora-system:def/model#hasModel> \"GenericFile\";\n    <http://purl.org/dc/terms/title> ?t;\n    <http://fedora.info/definitions/v4/repository#uuid> ?u .\noptional {\n    ?s <http://www.w3.org/ns/ldp#contains> ?c .\n    ?c <http://fedora.info/definitions/v4/repository#digest> ?d .\n    filter regex(str(?c), \"content$\", \"i\")\n  }\n} limit 100",
        "shared" : true
      },
      "Find Object Info with Content Checksum (Optional)" : {
        "name" : "Find Object Info with Content Checksum (Optional)",
        "body" : "select *\nwhere { \n\t?s <info:fedora/fedora-system:def/model#hasModel> \"GenericFile\";\n    <http://purl.org/dc/terms/title> ?t;\n    <http://fedora.info/definitions/v4/repository#uuid> ?u .\noptional {\n    ?s <http://www.w3.org/ns/ldp#contains> ?c .\n    ?c <http://fedora.info/definitions/v4/repository#digest> ?d .\n    filter regex(str(?c), \"content$\", \"i\")\n  }\n}\n",
        "shared" : false
      },
      "Find HN Fedora 4.2 Data Object Info" : {
        "name" : "Find HN Fedora 4.2 Data Object Info",
        "body" : "# hn_fedora_data result columns\n# PID,UUID,handle,title,deposit date,# DCQ datastreams,# DC datastreams,# DS datastreams,# LICENSE datastreams,DCQ IDs,DCQ MD5s,DCQ version changes,DS IDs,DS MD5s,DS MIME Type,DS version changes,LICENSE IDs,LICENSE version changes\n\n#select (count(*) as ?count)\nselect ?pid ?uuid ?handle ?doi ?title ?deposit_date ?fcrepo3_created_date ?fcrepo4_created_date ?file_name ?file_size ?checksum ?mime_type ?license\nwhere { \n\t?s <info:fedora/fedora-system:def/model#hasModel> \"GenericFile\";\n    optional {\n    ?s <http://terms.library.ualberta.ca/id/fedora3uuid> ?pid;\n    <http://fedora.info/definitions/v4/repository#uuid> ?uuid;\n    <http://terms.library.ualberta.ca/id/fedora3handle> ?handle;\n    <http://terms.library.ualberta.ca/id/doi> ?doi;\n    <http://purl.org/dc/terms/title> ?title;\n    <http://purl.org/dc/terms/dateAccepted> ?deposit_date; # deposit_date\n    <info:fedora/fedora-system:def/model#createdDate> ?fcrepo3_created_date; # deposit_date\n    <http://fedora.info/definitions/v4/repository#created> ?fcrepo4_created_date; # deposit_date\n    <http://purl.org/dc/terms/license> ?license;\n    <http://www.w3.org/ns/ldp#contains> ?c .\n    ?c <http://www.loc.gov/premis/rdf/v1#hasOriginalName> ?file_name;\n    <http://fedora.info/definitions/v4/repository#digest> ?cheksum;\n    <http://fedora.info/definitions/v4/repository#mimeType> ?mime_type;\n    <http://www.loc.gov/premis/rdf/v1#hasSize> ?file_size\n    .\n    filter regex(str(?c), \"content$\", \"i\")\n    }\n}\nlimit 100",
        "shared" : false
      },
      "Find Last Deleted Objects" : {
        "name" : "Find Last Deleted Objects",
        "body" : "PREFIX premis: <http://www.loc.gov/premis/rdf/v1#>\nselect ?o ?d\nwhere {\n  ?s premis:hasEventDateTime ?d;\n  ?p <http://id.loc.gov/vocabulary/preservation/eventType/del>;\n  <http://www.loc.gov/premis/rdf/v1#hasEventRelatedObject> ?o .\n}\norder by desc(?d)\nlimit 10",
        "shared" : true
      },
      "Count Event by Agent" : {
        "name" : "Count Event by Agent",
        "body" : "SELECT ?o (COUNT(*) AS ?count)\nWHERE {\n  ?s <http://www.loc.gov/premis/rdf/v1#hasEventRelatedAgent> ?o .\n}\nGROUP BY ?o",
        "shared" : true
      }
    }
  },
  "graphs" : {
    "2bbb3be9dc6a4c98966afffde632015f" : {
      "id" : "2bbb3be9dc6a4c98966afffde632015f",
      "name" : "test",
      "data" : "{\"nodes\":[{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/e2/96/85/7f/e296857f-072f-431d-b6ba-3540d197d856\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"e296857f-072f-431d-b6ba-3540d197d856\"}],\"types\":[\"http://fedora.info/definitions/v4/repository#Container\",\"http://fedora.info/definitions/v4/repository#Resource\",\"http://pcdm.org/models#Object\",\"http://terms.library.ualberta.ca/Community\",\"http://www.w3.org/ns/ldp#Container\",\"http://www.w3.org/ns/ldp#RDFSource\"],\"rdfRank\":0,\"x\":249.87261535642241,\"y\":320.28956501186536},{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"f4b0dc9f-9a47-4c5d-9869-6d18dba54069\"}],\"types\":[\"http://fedora.info/definitions/v4/repository#Container\",\"http://fedora.info/definitions/v4/repository#Resource\",\"http://pcdm.org/models#Object\",\"http://projecthydra.org/works/models#FileSet\",\"http://www.w3.org/ns/ldp#Container\",\"http://www.w3.org/ns/ldp#RDFSource\"],\"rdfRank\":0,\"x\":405.23301643247396,\"y\":686.4020999436998},{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"prod\"}],\"types\":[\"http://fedora.info/definitions/v4/repository#Container\",\"http://fedora.info/definitions/v4/repository#Resource\",\"http://www.w3.org/ns/ldp#Container\",\"http://www.w3.org/ns/ldp#RDFSource\"],\"rdfRank\":0,\"x\":33.99169408198337,\"y\":577.236250772674},{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/e2/96/85/7f/e296857f-072f-431d-b6ba-3540d197d856/members\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"members\"}],\"types\":[\"http://fedora.info/definitions/v4/repository#Container\",\"http://fedora.info/definitions/v4/repository#Resource\",\"http://www.w3.org/ns/ldp#Container\",\"http://www.w3.org/ns/ldp#IndirectContainer\",\"http://www.w3.org/ns/ldp#RDFSource\"],\"rdfRank\":0,\"x\":-42.97860969024524,\"y\":246.63881483861104},{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/member_of_collections/c5582843-c362-4e11-91df-2f422d3d4bf0\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"c5582843-c362-4e11-91df-2f422d3d4bf0\"}],\"types\":[\"http://fedora.info/definitions/v4/repository#Container\",\"http://fedora.info/definitions/v4/repository#Resource\",\"http://www.openarchives.org/ore/terms/Proxy\",\"http://www.w3.org/ns/ldp#Container\",\"http://www.w3.org/ns/ldp#RDFSource\"],\"rdfRank\":0,\"x\":350.382172342052,\"y\":92.73767772054346},{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files/4d79d212-b440-4d97-880f-d443af01c582\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"4d79d212-b440-4d97-880f-d443af01c582\"}],\"types\":[\"http://fedora.info/definitions/v4/repository#Binary\",\"http://fedora.info/definitions/v4/repository#Resource\",\"http://pcdm.org/models#File\",\"http://pcdm.org/use#OriginalFile\",\"http://www.w3.org/ns/ldp#NonRDFSource\"],\"rdfRank\":0,\"x\":765.4491927416626,\"y\":544.0664115644449},{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"files\"}],\"types\":[\"http://fedora.info/definitions/v4/repository#Container\",\"http://fedora.info/definitions/v4/repository#Resource\",\"http://www.w3.org/ns/ldp#Container\",\"http://www.w3.org/ns/ldp#DirectContainer\",\"http://www.w3.org/ns/ldp#RDFSource\"],\"rdfRank\":0,\"x\":811.5619858626367,\"y\":906.7672116725565},{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/member_of_collections\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"member_of_collections\"}],\"types\":[\"http://fedora.info/definitions/v4/repository#Container\",\"http://fedora.info/definitions/v4/repository#Resource\",\"http://www.w3.org/ns/ldp#Container\",\"http://www.w3.org/ns/ldp#IndirectContainer\",\"http://www.w3.org/ns/ldp#RDFSource\"],\"rdfRank\":0,\"x\":239.4793732471975,\"y\":945.2126399664091},{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/e2/96/85/7f/e296857f-072f-431d-b6ba-3540d197d856/members/cce78a15-9216-4771-870c-23ed1fe458ce\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"cce78a15-9216-4771-870c-23ed1fe458ce\"}],\"types\":[\"http://fedora.info/definitions/v4/repository#Container\",\"http://fedora.info/definitions/v4/repository#Resource\",\"http://www.openarchives.org/ore/terms/Proxy\",\"http://www.w3.org/ns/ldp#Container\",\"http://www.w3.org/ns/ldp#RDFSource\"],\"rdfRank\":0,\"x\":483.79704945348533,\"y\":459.7896184273871},{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files/4d79d212-b440-4d97-880f-d443af01c582/fcr:metadata\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"fcr:metadata\"}],\"types\":[],\"rdfRank\":0,\"x\":1010.6279763779386,\"y\":455.8294865044483},{\"iri\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files/4d79d212-b440-4d97-880f-d443af01c582/fcr:fixity\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"fcr:fixity\"}],\"types\":[],\"rdfRank\":0,\"x\":649.5856500867078,\"y\":796.7422466763148},{\"iri\":\"urn:sha1:3cc467bead11109bc87276ee98c69e3fb55f5ccd\",\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"urn:sha1:3cc467bead11109bc87276ee98c69e3fb55f5ccd\"}],\"types\":[],\"rdfRank\":0,\"x\":803.4115714961306,\"y\":242.64343146771174}],\"links\":[{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/e2/96/85/7f/e296857f-072f-431d-b6ba-3540d197d856\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069\",\"predicates\":[\"hasMember\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/e2/96/85/7f/e296857f-072f-431d-b6ba-3540d197d856\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod\",\"predicates\":[\"hasParent\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/e2/96/85/7f/e296857f-072f-431d-b6ba-3540d197d856\",\"predicates\":[\"memberOf\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/e2/96/85/7f/e296857f-072f-431d-b6ba-3540d197d856/members\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/e2/96/85/7f/e296857f-072f-431d-b6ba-3540d197d856\",\"predicates\":[\"membershipResource\",\"hasParent\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/member_of_collections/c5582843-c362-4e11-91df-2f422d3d4bf0\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/e2/96/85/7f/e296857f-072f-431d-b6ba-3540d197d856\",\"predicates\":[\"proxyFor\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files/4d79d212-b440-4d97-880f-d443af01c582\",\"predicates\":[\"hasFile\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod\",\"predicates\":[\"hasParent\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069\",\"predicates\":[\"membershipResource\",\"hasParent\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/member_of_collections\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069\",\"predicates\":[\"membershipResource\",\"hasParent\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/e2/96/85/7f/e296857f-072f-431d-b6ba-3540d197d856/members/cce78a15-9216-4771-870c-23ed1fe458ce\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069\",\"predicates\":[\"proxyFor\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files/4d79d212-b440-4d97-880f-d443af01c582\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files/4d79d212-b440-4d97-880f-d443af01c582/fcr:metadata\",\"predicates\":[\"describedby\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files/4d79d212-b440-4d97-880f-d443af01c582\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files/4d79d212-b440-4d97-880f-d443af01c582/fcr:fixity\",\"predicates\":[\"hasFixityService\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files/4d79d212-b440-4d97-880f-d443af01c582\",\"target\":\"urn:sha1:3cc467bead11109bc87276ee98c69e3fb55f5ccd\",\"predicates\":[\"hasMessageDigest\"]},{\"source\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files/4d79d212-b440-4d97-880f-d443af01c582\",\"target\":\"http://mycombe.library.ualberta.ca:8080/fedora/rest/prod/f4/b0/dc/9f/f4b0dc9f-9a47-4c5d-9869-6d18dba54069/files\",\"predicates\":[\"hasParent\"]}],\"colorIndex\":14,\"type2color\":{\"http://fedora.info/definitions/v4/repository#Container\":0,\"http://fedora.info/definitions/v4/repository#Resource\":1,\"http://pcdm.org/models#Object\":2,\"http://projecthydra.org/works/models#FileSet\":3,\"http://www.w3.org/ns/ldp#Container\":4,\"http://www.w3.org/ns/ldp#RDFSource\":5,\"http://fedora.info/definitions/v4/repository#Binary\":6,\"http://pcdm.org/models#File\":7,\"http://pcdm.org/use#OriginalFile\":8,\"http://www.w3.org/ns/ldp#NonRDFSource\":9,\"http://www.w3.org/ns/ldp#DirectContainer\":10,\"http://www.openarchives.org/ore/terms/Proxy\":11,\"undefined\":12,\"http://terms.library.ualberta.ca/Community\":13},\"scale\":0.9087781164485206,\"translate\":[50.117707251717206,-29.194181629262516]}",
      "owner" : "admin",
      "config" : null
    }
  }
}