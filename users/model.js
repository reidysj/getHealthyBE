const db = require("../data/dbConfig.js");

module.exports = {
    add,
    getBy
};

function add(user) {
    return db("users")
        .returning("id")
        .insert(user)
        .then(([id]) => {
            return getBy(id);
        });
}

function getBy(filter) {
    return db("users").first().where(filter);
}
