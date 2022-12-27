CREATE DATABASE sbor
  WITH OWNER "demiurgen"
  ENCODING 'UTF8'
  LC_COLLATE = 'ru_RU.utf-8'
  LC_CTYPE = 'ru_RU.utf-8'
  TEMPLATE = template0;

create TABLE hotels (
    id SERIAL PRIMARY KEY,
    hotel_title varchar(70),
    latitude varchar(12),
    longitude varchar(12),
    google_name varchar(255),
    comment text,
    iframe text;
);

create TABLE tours (
    d SERIAL PRIMARY KEY,
    tour_name varchar(50)
);

create table buses (
    id serial primary key,
    type varchar(7),
    size integer,
    tour_id integer references tours(id),
    date_id integer references dates(id)
);

create table contacts(
    id serial primary key,
    contact_name varchar(255),
    number varchar(20),
    number_type varchar(20) -- whatspp, phone, telegram
);


create table bookings(
    id serial primary key,
    booking_type varchar(10),
    created timestamp,
    tour_date date,
    tour_id integer references tours(id),
    pax smallint,
    hotel_id integer references hotels(id),
    room varchar(8),
    contact_id integer references contacts,
    collect smallint,
    comment text
);
