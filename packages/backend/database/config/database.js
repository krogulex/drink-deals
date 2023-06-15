const knexfile = require('../../knexfile');
const knex = require('knex');
const { Model } = require('objection');

function setupDb() {
    const db = knex(knexfile.development);
  
    // plug db config into objection
    Model.knex(db);
  }
  
  module.exports = setupDb;