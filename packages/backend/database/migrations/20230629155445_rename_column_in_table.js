exports.up = function(knex) {
    return knex.schema.table('promotions', function(table) {
      table.renameColumn('google-maps', 'googleMaps');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('your_table_name', function(table) {
      table.renameColumn('new_column_name', 'old_column_name');
    });
  };
  