const db = require("./connections");

function createUser(username, password) {
    const CREATE_USER = `INSERT INTO users (username, password) VALUES ($1, $2)`;
    return db
        .query(CREATE_USER, [username, password])
        .then((result) => result.rows[0]);
};

function getUser(username) {
    const GET_USER = `SELECT * FROM users WHERE users.id = $1`;
    return db
        .query(GET_USER, [username])
        .then((result) => result.rows[0]);
};

function createPost(user_id, title, alt_text, image) {
    const CREATE_POST = `INSERT INTO posts (user_id, title, alt_text, image) VALUES ($1, $2, $3, $4)`;
    return db
        .query(CREATE_POST, [user_id, title, alt_text, image])
        .then((result) => result.rows[0]);
};

function getAllPosts() {
    const GET_ALL_POSTS = `SELECT users.username, posts.title, posts.alt_text, posts.image 
    FROM users
    INNER JOIN posts
    ON users.id = posts.user_id`
    return db
        .query(GET_ALL_POSTS)
        .then((result) => result.rows)
};

function createSession(sid, data) {
    const CREATE_SESSION = `INSERT INTO sessions (sid, data) VALUES ($1, $2)`;
    return db
        .query(CREATE_SESSION, [sid, data])
        .then((result) => result.rows[0])
};

function getSession(sid) {
    const GET_SESSION = `SELECT * FROM sessions WHERE sid = $1`;
    return db
        .query(GET_SESSION, [sid])
        .then((result) => result.rows[0])
};

function endSession(sid) {
    const END_SESSION = `DELETE * FROM sessions WHERE sid = $1`;
    return db
        .query(END_SESSION, [sid])
        .then((result) => result.rows[0])
};

module.exports = {
    createUser,
    getUser,
    createPost,
    getAllPosts,
    createSession,
    getSession,
    endSession
}