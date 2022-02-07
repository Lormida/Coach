const Request = require('../models/Request')

exports.getRequests = function (req, res, next) {
  Request.find()
    .then((data) => {
      const dataToClient = Request.toClient(data)
      res.status(200).json({ arrayRequests: dataToClient })
    })
    .catch(err => res.status(401).json({ error: err }))
}

exports.createRequest = function (req, res, next) {
  Request.create(req.body.data)
    .then((data) => res.status(200).json({ status: 'success created', ...data }))
    .catch(err => res.status(401).json({ error: err }))
}

exports.deleteRequestById = function (req, res, next) {
  Request.deleteOne(req.params)
    .then(() => res.status(201).json({ status: 'success deleted' }))
    .catch(err => res.status(401).json({ error: err }))
}