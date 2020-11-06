--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: MovieItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MovieItems" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "movieId" integer NOT NULL
);


ALTER TABLE public."MovieItems" OWNER TO postgres;

--
-- Name: MovieItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MovieItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MovieItems_id_seq" OWNER TO postgres;

--
-- Name: MovieItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MovieItems_id_seq" OWNED BY public."MovieItems".id;


--
-- Name: Movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movies" (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(250),
    stock integer DEFAULT 0,
    "availableStock" integer DEFAULT 0,
    "rentalPrice" double precision NOT NULL,
    likes integer DEFAULT 0,
    "salePrice" double precision NOT NULL,
    availability boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Movies" OWNER TO postgres;

--
-- Name: Movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Movies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Movies_id_seq" OWNER TO postgres;

--
-- Name: Movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Movies_id_seq" OWNED BY public."Movies".id;


--
-- Name: UserLikeModels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserLikeModels" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL,
    "MovieId" integer NOT NULL
);


ALTER TABLE public."UserLikeModels" OWNER TO postgres;

--
-- Name: UserLikeMovieModels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserLikeMovieModels" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL,
    "MovieId" integer NOT NULL
);


ALTER TABLE public."UserLikeMovieModels" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    "firstName" character varying(50) NOT NULL,
    "lastName" character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    role character varying(30) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: MovieItems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovieItems" ALTER COLUMN id SET DEFAULT nextval('public."MovieItems_id_seq"'::regclass);


--
-- Name: Movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movies" ALTER COLUMN id SET DEFAULT nextval('public."Movies_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: MovieItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MovieItems" (id, "createdAt", "updatedAt", "movieId") FROM stdin;
1	2020-11-06 10:40:44.003-06	2020-11-06 10:40:44.003-06	1
2	2020-11-06 10:40:45.953-06	2020-11-06 10:40:45.953-06	1
3	2020-11-06 10:40:46.203-06	2020-11-06 10:40:46.203-06	1
4	2020-11-06 10:40:46.549-06	2020-11-06 10:40:46.549-06	1
5	2020-11-06 10:40:46.89-06	2020-11-06 10:40:46.89-06	1
6	2020-11-06 10:40:47.216-06	2020-11-06 10:40:47.216-06	1
7	2020-11-06 10:40:47.543-06	2020-11-06 10:40:47.543-06	1
\.


--
-- Data for Name: Movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movies" (id, title, description, stock, "availableStock", "rentalPrice", likes, "salePrice", availability, "createdAt", "updatedAt") FROM stdin;
3	Sacred Games 	A link in their pasts leads an honest cop to a fugitive gang boss, whose cryptic warning spurs the officer on a quest to save Mumbai from cataclysm.	0	0	10.9	0	150.99	t	2020-11-06 10:00:51.753-06	2020-11-06 10:00:51.753-06
4	Laxmii	The film deals with a ghost seeking vengeance for being wronged and haunts everyone who is staying in the house.	0	0	10.9	0	150.99	t	2020-11-06 10:02:31.42-06	2020-11-06 10:02:31.42-06
2	Mirzapur 	A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.	0	0	59.9	0	99.9	f	2020-11-06 09:59:50.317-06	2020-11-06 09:59:50.317-06
5	The lego star wars holideay special 2020	The LEGO Star Wars Holiday Special reunites Rey, Finn, Poe, Chewie, Rose and the droids for a joyous feast on Life Day. Rey sets off on a new adventure with BB-8 to gain a deeper knowledge of the Force	0	0	2.99	0	9.99	t	2020-11-06 10:06:24.871-06	2020-11-06 10:06:24.871-06
6	The Trial of the Chicago 7	The story of 7 people on trial stemming from various charges surrounding the uprising at the 1968 Democratic National Convention in Chicago, Illinois.	0	0	9.99	0	99.99	t	2020-11-06 10:08:24.402-06	2020-11-06 10:08:24.402-06
7	Watchmen	Set in an alternate history where masked vigilantes are treated as outlaws, Watchmen embraces the nostalgia of the original groundbreaking graphic novel of the same name, while attempting to break new ground of its own.	0	0	9.99	0	99.99	t	2020-11-06 10:10:08.559-06	2020-11-06 10:10:08.559-06
8	Westworld 	Set at the intersection of the near future and the reimagined past, explore a world in which every human appetite can be indulged without consequence.	0	0	20.99	0	99.99	t	2020-11-06 10:12:38.877-06	2020-11-06 10:12:38.877-06
9	Asur: Welcome to Your Dark Side	A unique crime thriller that pits two opposing worlds against each other. The less explored, intricate world of forensic science and the deep mysticism of ancient Indian Mythology.	0	0	20.99	0	99.99	f	2020-11-06 10:14:14.266-06	2020-11-06 10:14:14.266-06
1	El titanic	Esta es una prueba	7	7	50	0	40	f	2020-11-06 09:59:01.481-06	2020-11-06 10:40:47.546-06
\.


--
-- Data for Name: UserLikeModels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserLikeModels" ("createdAt", "updatedAt", "UserId", "MovieId") FROM stdin;
\.


--
-- Data for Name: UserLikeMovieModels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserLikeMovieModels" ("createdAt", "updatedAt", "UserId", "MovieId") FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, username, "firstName", "lastName", email, password, role, "createdAt", "updatedAt") FROM stdin;
2	admin	admin	admin	admin@admin.com	$2b$10$apt8ZDVWXkohJSkrV3YRxOFT8hiT8D8eX5SWvyBS.ePor0s9qyWIW	admin	2020-11-06 09:44:31.802-06	2020-11-06 09:44:31.802-06
4	leonel	Leonel	Leonel	leonel@leonel.com	$2b$10$or/dUGgJvnygXRHN6MB/JeEopgljPjsFqEgNGlF0zoJrQVOyOkHbS	default	2020-11-06 09:46:38.372-06	2020-11-06 09:46:38.372-06
5	carlos	Carlos	Carlos	carlos@carlos.com	$2b$10$sXD.98FdvlvSgRgPmeTZS.o48rrfqVeQA8V9vCH0StE7nhPoTgFEa	default	2020-11-06 09:51:14.902-06	2020-11-06 09:51:14.902-06
\.


--
-- Name: MovieItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MovieItems_id_seq"', 7, true);


--
-- Name: Movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Movies_id_seq"', 9, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 5, true);


--
-- Name: MovieItems MovieItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovieItems"
    ADD CONSTRAINT "MovieItems_pkey" PRIMARY KEY (id);


--
-- Name: Movies Movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movies"
    ADD CONSTRAINT "Movies_pkey" PRIMARY KEY (id);


--
-- Name: UserLikeModels UserLikeModels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLikeModels"
    ADD CONSTRAINT "UserLikeModels_pkey" PRIMARY KEY ("UserId", "MovieId");


--
-- Name: UserLikeMovieModels UserLikeMovieModels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLikeMovieModels"
    ADD CONSTRAINT "UserLikeMovieModels_pkey" PRIMARY KEY ("UserId", "MovieId");


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: MovieItems MovieItems_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovieItems"
    ADD CONSTRAINT "MovieItems_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public."Movies"(id) ON UPDATE CASCADE;


--
-- Name: UserLikeMovieModels UserLikeMovieModels_MovieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLikeMovieModels"
    ADD CONSTRAINT "UserLikeMovieModels_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES public."Movies"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserLikeMovieModels UserLikeMovieModels_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLikeMovieModels"
    ADD CONSTRAINT "UserLikeMovieModels_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

