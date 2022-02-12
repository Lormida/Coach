const express = require('express')
const cors = require('cors')
const app = express()
const { urlencoded } = require('express')
const rootRouter = require('./routers/rootRouter')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
}))

app.use(express.json())
app.use(urlencoded({ extended: false }))

app.use('/', rootRouter)



module.exports = app
