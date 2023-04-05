/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl.string('user_guid')
    tbl.string('username').notNullable().unique()
    tbl.string('password').notNullable()
    tbl.string('email').notNullable().unique()
    tbl.string('city')
    tbl.string('state')
    tbl.string('mobile_number')
    tbl.boolean('mobile_contact_allowed')
    tbl.boolean('email_contact_enabled')
    tbl.timestamp('account_created_at').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('users_goals')
};
