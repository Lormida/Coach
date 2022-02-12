const Coach = require('../models/Coach')

exports.getCoaches = function (req, res, next) {
  Coach.find()
    .then((data) => {
      const dataToClient = Coach.toClient(data)
      res.status(200).json({ arrayCoaches: dataToClient })
    })
    .catch(err => res.status(401).json({ error: err }))
}

/* exports.createCoach = function (req, res, next) {
  let email = req.body.data.email

  Coach.findOne({ email })
    // Check exists user or not
    .then(coach => {
      return new Promise((resolve, reject) => {
        if (coach) {
          reject('Coach exists!')
        }
        resolve(req.body.data)
      })
    })
    // User doesn't exists -> create him
    .then(coach => {
      return Coach.create(req.body.data)
    })
    .then((data) => res.status(200).json({ status: 'success created', data: req.body.data }))
    .catch(err => res.status(401).json({ error: err }))
} */

/* exports.loginCoach = function (req, res, next) {
  const { email, password } = req.body.data
  Coach.findOne({ email, password })
    .then(coach => {
      return new Promise((resolve, reject) => {
        if (!coach) {
          resolve(coach)
        }
        reject('Incorrect login or password')
      })
    })
    .then(coach => res.status(201).json({ data: coach, status: 'success' }))
    .catch(err => res.status(401).json({ error: err }))
} */

exports.deleteCoachById = function (req, res, next) {
  Coach.deleteOne(req.params)
    .then(() => res.status(201).json({ status: 'success deleted' }))
    .catch(err => res.status(401).json({ error: err }))
}