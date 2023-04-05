/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users_goals', tbl => {
        tbl.increments();
        tbl.integer("goal_id").references("id").inTable("goals").onDelete("CASCADE").onUpdate("CASCADE")
        tbl.integer("user_id").references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE")
        tbl.string("frequency")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users_goals')
};
