const db = require("../data/dbConfig");

module.exports = {
    getAll,
    add,
    getBy,
    associateUser,
};

function getAll() {
    return db("goals");
}

function getBy(filter) {
    return db("goals").where(filter);
}

function add(goal) {
    return db("goals")
        .insert(goal)
        .returning("id")
        .then(([id]) => {
            return getBy(id);
        });
}

function associateUser(user_id, goal_id) {
    return db("users_goals")
        .insert({ user_id, goal_id })
        .then(() => {
            return getBy({ id: goal_id });
        });
}
