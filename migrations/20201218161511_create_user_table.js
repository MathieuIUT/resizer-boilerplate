
exports.up = function(knex) {
    return knex.schema.createTable('user', function(table) {
        table.increments('id');
        table.string('username');
        table.string('password');
        table.bigInteger('createdAt').notNullable();
        table.bigInteger('updatedAt').notNullable();
      })
    
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
