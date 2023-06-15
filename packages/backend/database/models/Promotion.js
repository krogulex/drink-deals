const { Model } = require('objection');
const knex = require('../../knex');

Model.knex(knex)

class Promotion extends Model {
    static get tableName() {
        return 'promotions'
    }
}

module.exports = Promotion