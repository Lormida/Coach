const mongoose = require('mongoose')
const app = require('./app')

const url = `mongodb+srv://lormida:<password>@cluster0.gt9nc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  .replace('<password>', 'midapa24')

mongoose.connect(url, {
  useNewUrlParser: true,
})
  .then(() => {
    app.listen(3000, () => {
      console.log('server run')
    })
  })
  .catch(err => console.log(err))
