const express = require('express')
const cors = require('cors')
const compression = require('compression')
const { urlencoded } = require('express')
const rootRouter = require('./routers/rootRouter')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const createError = require('http-errors')
const app = express()

app.use(helmet())
app.use(cookieParser())
app.use(cors({
  // origin: "http://localhost:8080",
  credentials: true,
}))
app.use(express.json())
app.use(urlencoded({ extended: false }))
// compress all responses
app.use(compression())
app.use('/api', rootRouter)

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'))
  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

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
