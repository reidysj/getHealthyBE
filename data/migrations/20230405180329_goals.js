/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("goals", tbl => {
        tbl.increments()
        tbl.string('goal_guid').notNullable()
        tbl.string('goal').notNullable().unique();
        tbl.integer('weight').defaultTo(1)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('goals').dropTableIfExists('users_goals')
};
