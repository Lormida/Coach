const express = require('express')
const cors = require('cors')
const app = express()
// const { globalErrorHandler } = require('./controllers/errorController')
const { urlencoded } = require('express')
const rootRouter = require('./routers/rootRouter')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const createError = require('http-errors')

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
  next(new createError(404, `Cant find ${req.originalUrl} on this server!`))
})

app.use((error, req, res, next) => {
  // Установка кода состояния ответа\
  console.log('Error handle by bus : ', error.status, error.message)
  error.message = error.message || 'Something wrong!'
  error.status = error.status || 500

  // Отправка ответа
  res.status(error.status).json({
    status: error.status,
    message: error.message,
  })
})


module.exports = app
