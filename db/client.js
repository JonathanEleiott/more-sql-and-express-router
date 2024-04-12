const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/bretts_pets');

module.exports = client;