
CREATE TABLE document_modules (
	id_module int2 NOT NULL,
	name varchar NOT NULL,
	description varchar NOT NULL,
	CONSTRAINT documents_module_pkey PRIMARY KEY (id_module)
);


CREATE TABLE document_types (
	id_type uuid NOT NULL DEFAULT gen_random_uuid(),
	code_type varchar NOT NULL,
	type varchar NOT NULL,
	description varchar NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	path_ephemeral varchar NOT NULL,
	path_person varchar NOT NULL,
	extensions varchar NOT NULL,
	max_size_mb int4 NULL,
	CONSTRAINT documents_types_pkey PRIMARY KEY (id_type)
);
CREATE TABLE documents (
	id_document uuid NOT NULL DEFAULT gen_random_uuid(),
	curp varchar NULL,
	telefono varchar NULL,
	type_document uuid NULL,
	blob_url varchar NULL,
	blob_name varchar NULL,
	name_document varchar NULL,
	name_with_timestamp varchar NULL,
	mime_type varchar NULL,
	module int2 NULL,
	validity date NULL,
	channel uuid NULL,
	status bpchar(1) NULL,
	user_id varchar NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT documents_pkey PRIMARY KEY (id_document),
	CONSTRAINT documents_modules_fkey FOREIGN KEY (module) REFERENCES document_modules(id_module)
);

CREATE TABLE documents_logs (
	id_logs uuid NOT NULL DEFAULT gen_random_uuid(),
	id_document uuid NULL,
	channel uuid NULL,
	person varchar NULL,
	type varchar NULL,
	user_id varchar NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT documents_logs_pkey PRIMARY KEY (id_logs),
	CONSTRAINT documents_logs_documents_fkey FOREIGN KEY (id_document) REFERENCES documents(id_document)
);