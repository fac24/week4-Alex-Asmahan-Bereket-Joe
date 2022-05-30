BEGIN;

DROP TABLE IF EXISTS users, posts, sessions CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    image BYTEA
);

CREATE TABLE sessions (
    sid TEXT UNIQUE NOT NULL PRIMARY KEY,
    data JSON NOT NULL 
);

INSERT INTO users (username, password) VALUES
('imager', '123');

COMMIT;