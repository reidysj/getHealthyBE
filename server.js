const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()

const usersRouter = require('./users/router')
const goalsRouter = require("./goals/router")

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use('/api/users', usersRouter)
server.use('/api/goals', goalsRouter)

server.get('/', (req, res, _next) => {
    res.status(200).json({ api: "API is up and running!" })
})

module.exports = server;