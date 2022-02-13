const express = require('express')
const cors = require('cors')
const app = express()
// const { globalErrorHandler } = require('./controllers/errorController')
const { urlencoded } = require('express')
const rootRouter = require('./routers/rootRouter')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

// app.use(helmet())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
}))

app.use(express.json())
app.use(urlencoded({ extended: false }))

app.use('/', rootRouter)

app.all('*', (req, res, next) => {
  const err = new AppError(`Cant find ${req.originalUrl} on this server!`)
  err.status = 'fail'
  err.statusCode = 404

  next(err)
})

app.use((err, req, res, next) => {
  console.log('Catch by bus handler...', err.message)
  res.json({ err })

})


module.exports = app
