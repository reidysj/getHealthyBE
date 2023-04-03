const jwt = require("jsonwebtoken");
module.exports = function generateToken(user, remember){
    const payload = {
        userId: user.id,
        username: user.username
    }
    const options = {
        expiresIn: remember ? '30d' : '2h'
    }
    const secret = process.env.JWT_SECRET
    return jwt.sign(payload, secret, options);
}