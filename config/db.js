const Sequelize = require('sequelize');
const db = new Sequelize('postgres://sanya:sanya11@localhost:5432/shop');

db.authenticate()
    .then(() => console.log('OK'))
    .catch(err => console.log(err));

module.exports = db;
