/* Replace with your SQL commands */
CREATE TABLE public.movies (
    id integer,
    title character varying(150),
    genres character varying(50),
    year character varying(50)
);

CREATE TABLE public.users (
    id integer,
    email character varying(50),
    gender character varying(50),
    password character varying(50),
    role character varying(50)
);