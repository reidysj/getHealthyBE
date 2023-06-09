const express = require("express");
const router = express.Router();
const Goals = require("./model.js");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const authenticator = require("../authentication/authenticator.js");

router.get("/", (_req, res, _next) => {
    Goals.getAll().then((goals) => res.status(200).json(goals));
});

router.post("/", authenticator, (req, res, _next) => {
    const goal = req.body.goal;
    const userInfo = jwt.decode(req.body.token);
    console.log(userInfo);
    const userId = userInfo && userInfo.userId;
    //if there's a goal
    if (goal) {
        //TODO: Make this middleware
        Goals.getBy({ goal }).then((results) => {
            console.log(results);
            if (results.length === 0) {
                const goal_guid = uuidv4();
                const goalProperties = { goal, goal_guid };
                Goals.add(goalProperties).then(([data]) => {
                    //TODO: Pull this out and make it reusable for the else statement
                    Goals.associateUser(userId, data.id).then((data) => {
                        res.status(201).json(data);
                    });
                });
            } else {
                const id = results[0].id;
                const weight = results[0].weight + 1;
                Goals.addWeight(id, weight).then(() => {
                    Goals.associateUser(userId, id).then((data) => {
                        //TODO: Verify that this is the conventional code for such a thing
                        res.status(201).json(data);
                    });
                });
            }
        });
    }
});

function associateUser(userId, goalId) {
    Goals.associateUser(userId, goalId);
}

module.exports = router;
