
exports.up = function(knex) {
  
    return knex.schema.createTable('students', table => {
        table.increments('id').primary().unsigned();
        table.string('BID').notNullable(); //student BID
        table.datetime('catalogYear', { precision: 6 }).defaultTo(knex.fn.now(6))
        table.bool('addOnly').default(false); //checkbox //////////////
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.integer("student_id").notNullable().unsigned().references("id").inTable("users").onDelete("CASCADE");
        table.datetime('date', { precision: 6 }).defaultTo(knex.fn.now(6));
   });

};

exports.down = function(knex) {
   return knex.schema.dropTableIfExists('students');
};
