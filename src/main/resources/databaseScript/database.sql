CREATE TABLE tourscanner.nation
(
    id integer NOT NULL DEFAULT nextval('tourscanner."NATION_ID_seq"'::regclass),
    name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "NATIONS_pkey" PRIMARY KEY (id),
    CONSTRAINT nation_name_unique UNIQUE (name)

)

    TABLESPACE pg_default;

ALTER TABLE tourscanner.nation
    OWNER to postgres;

CREATE TABLE tourscanner.tour
(
    common_cash_description text COLLATE pg_catalog."default",
    common_cash_included_services text COLLATE pg_catalog."default",
    duration character varying COLLATE pg_catalog."default",
    included_services text COLLATE pg_catalog."default",
    itinerary text COLLATE pg_catalog."default",
    nation_id integer,
    not_included_services text COLLATE pg_catalog."default",
    title character varying COLLATE pg_catalog."default" NOT NULL,
    price character varying COLLATE pg_catalog."default" NOT NULL,
    company_id integer NOT NULL,
    link_to_tour character varying COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL DEFAULT nextval('tourscanner.tour_id_seq'::regclass),
    CONSTRAINT tour_pkey PRIMARY KEY (id),
    CONSTRAINT unique_link UNIQUE (link_to_tour)

)

    TABLESPACE pg_default;

ALTER TABLE tourscanner.tour OWNER to postgres;

