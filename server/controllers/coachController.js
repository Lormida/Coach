const Coach = require('../models/Coach')

exports.getCoaches = function (req, res, next) {
  Coach.find()
    .then((data) => {
      const dataToClient = Coach.toClient(data)
      res.status(200).json({ arrayCoaches: dataToClient })
    })
    .catch(err => res.status(401).json({ error: err }))
}

exports.deleteCoachById = function (req, res, next) {
  Coach.deleteOne(req.params)
    .then(() => res.status(200).json({ status: 'success deleted' }))
    .catch(err => res.status(401).json({ error: err }))
}