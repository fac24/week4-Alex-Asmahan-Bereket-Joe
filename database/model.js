const db = require("./connections.js");

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
}



module.exports = {
    createUser,
    getUser
}