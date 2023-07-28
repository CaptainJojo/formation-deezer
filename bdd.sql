-- Adminer 4.8.1 PostgreSQL 14.8 (Debian 14.8-1.pgdg120+1) dump

DROP TABLE IF EXISTS "album";
CREATE TABLE "public"."album" (
    "id" integer NOT NULL,
    "artist_id" integer NOT NULL,
    "title" text NOT NULL
) WITH (oids = false);

INSERT INTO "album" ("id", "artist_id", "title") VALUES
(1,	1,	'album 1'),
(2,	1,	'album 2');

DROP TABLE IF EXISTS "artist";
CREATE TABLE "public"."artist" (
    "id" integer NOT NULL,
    "name" text,
    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "artist" ("id", "name") VALUES
(1,	'name'),
(2,	'artist 2'),
(3,	'artist 3');

DROP TABLE IF EXISTS "fan";
CREATE TABLE "public"."fan" (
    "id" integer NOT NULL,
    "artist_id" integer NOT NULL,
    "fans" integer NOT NULL
) WITH (oids = false);

INSERT INTO "fan" ("id", "artist_id", "fans") VALUES
(1,	1,	10000);

DROP TABLE IF EXISTS "favorites_artist";
CREATE TABLE "public"."favorites_artist" (
    "id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "artist_id" integer NOT NULL
) WITH (oids = false);

INSERT INTO "favorites_artist" ("id", "user_id", "artist_id") VALUES
(1,	1,	1),
(2,	1,	2),
(3,	1,	3),
(868482,	1,	2),
(722892,	1,	2),
(214890,	1,	2);

DROP TABLE IF EXISTS "for_you";
CREATE TABLE "public"."for_you" (
    "id" integer NOT NULL,
    "playlist_id" integer NOT NULL,
    "user_id" integer NOT NULL
) WITH (oids = false);

INSERT INTO "for_you" ("id", "playlist_id", "user_id") VALUES
(1,	1,	1),
(2,	2,	1),
(3,	3,	1);

DROP TABLE IF EXISTS "music";
CREATE TABLE "public"."music" (
    "id" integer NOT NULL,
    "title" text NOT NULL,
    "artist_id" integer NOT NULL,
    "album_id" integer
) WITH (oids = false);

INSERT INTO "music" ("id", "title", "artist_id", "album_id") VALUES
(1,	'music 1',	1,	1),
(3,	'music 3',	3,	1),
(2,	'music 2',	2,	2);

DROP TABLE IF EXISTS "playlist";
CREATE TABLE "public"."playlist" (
    "id" integer NOT NULL,
    "name" text NOT NULL
) WITH (oids = false);

INSERT INTO "playlist" ("id", "name") VALUES
(1,	'playlist 1'),
(2,	'playlist 2'),
(3,	'playlist 3');

DROP TABLE IF EXISTS "playlist_music";
CREATE TABLE "public"."playlist_music" (
    "id" integer NOT NULL,
    "playlist_id" integer NOT NULL,
    "music_id" integer NOT NULL
) WITH (oids = false);

INSERT INTO "playlist_music" ("id", "playlist_id", "music_id") VALUES
(1,	1,	1),
(2,	2,	2),
(3,	3,	3);

-- 2023-07-28 08:18:38.926525+00