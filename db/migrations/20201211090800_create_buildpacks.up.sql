CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS buildpacks(
   id uuid DEFAULT uuid_generate_v4 (),
   namespace VARCHAR (250) NOT NULL,
   name VARCHAR (250) NOT NULL,
   version VARCHAR (250) NOT NULL,
   addr VARCHAR (250) NOT NULL,
   description TEXT,
   homepage TEXT,
   licenses TEXT[],
   stacks TEXT[],
   PRIMARY KEY (id),
   CONSTRAINT buildpack_version UNIQUE (namespace,name,version)
);
