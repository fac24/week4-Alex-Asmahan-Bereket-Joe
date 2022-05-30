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
    ('Alex', 'pass123'),
    ('Asmahan', 'pass123'),
    ('Bereket', 'pass123'),
    ('Joe', 'pass123');

INSERT INTO posts (user_id, title, alt_text) VALUES
    (1, 'Test 1', 'My alt text'),
    (2, 'Test 2', 'Helpful alt text'),
    (3, 'Test 3', 'More alt text'),
    (4, 'Test 4', 'Alt text');

COMMIT;