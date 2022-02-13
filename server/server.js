const mongoose = require('mongoose')
const app = require('./app')

const url = `mongodb+srv://lormida:<password>@cluster0.gt9nc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  .replace('<password>', 'midapa24')

let server = null

mongoose.connect(url, {
  useNewUrlParser: true,
})
  .then(() => {
    server = app.listen(3000, () => {
      console.log('server run')
    })
  })
  .catch(err => console.log(err.message))


process.on('unhandledRejection', err => {
  console.log(err.name, err.message)
  console.log('UNHANDLED REJECTION! Shutting down ...')
  server.close(() => {
    process.exit(1)
  })
})