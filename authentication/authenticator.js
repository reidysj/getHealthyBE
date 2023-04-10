const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    //TODO: Once frontend has it fixed, token will be a header
    const token = req.data.jwt;
    const secret = process.env.JWT_SECRET || "no";

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: "Bad Token" });
                res.redirect("/login");
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: "Must provide credentials" });
    }
};
