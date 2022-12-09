
exports.up = function(knex) {
    return knex.schema.createTable('academic_info', table => {
        table.increments('id').primary().unsigned();
        table.string('school_name').notNullable();
        table.string('degree').notNullable();
        table.string('major').notNullable();
        table.string('minor').notNullable();
        table.integer("advisor_id").notNullable().unsigned().references("id").inTable("users").onDelete("CASCADE");
        table.integer("dean_id").notNullable().unsigned().references("id").inTable("users").onDelete("CASCADE");
        table.bool('is_advisor_approved').default(false);
        table.bool('is_dean_approved').default(false);
        table.string('old_new_flag').notNullable();//old/new
        table.integer("student_id").notNullable().unsigned().references("id").inTable("users").onDelete("CASCADE");
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('academic_info');
};
