const knex = require('knex');

const knexConfig = require('../knexfile.js');

//switch to production when deploying to Heroku
module.exports = knex(knexConfig.production);