const express = require("express");
const router = express.Router();
const Goals = require("./model.js");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res, _next) => {
    Goals.getAll().then((goals) => res.status(200).json(goals));
});

router.post("/", (req, res, _next) => {
    const { goal } = req.body;
    const userInfo = jwt.decode(req.body.token);
    const userId = userInfo && userInfo.userId;
    const goal_guid = uuidv4();
    const goalProperties = { goal, goal_guid };
    Goals.add(goalProperties).then(([data]) => {
        Goals.associateUser(userId, data.id).then((data) => {
            res.status(201).json(data);
        });
    });
});

module.exports = router;
