const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');
const Users = require('./model.js')
const { v4: uuidv4 } = require('uuid')

router.post('/register', (req, res, _next) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 12);
    const guid = uuidv4();
    newUser.password = hash;
    newUser.user_guid = guid;
    Users.add(newUser)
        .then(user => {
            user.password = null;
            user.user_guid = null;
            res.status(201).json(user)
        })
})

module.exports = router;