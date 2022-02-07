const { urlencoded } = require('express')
const express = require('express')
var cors = require('cors')
const app = express()

const rootRouter = require('./routers/rootRouter')

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: false }))

app.use('/', rootRouter)


module.exports = app
