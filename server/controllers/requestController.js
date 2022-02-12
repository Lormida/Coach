const Request = require('../models/Request')
const Coach = require('../models/Coach')

exports.getRequests = async function (req, res, next) {
  const { userId, userRole } = res.locals

  sortObject = null
  if (userRole === 'admin') {
    sortObject = {}
  } else if (userRole === 'user') {
    const coachEmail = (await Coach.findById(userId)).email
    sortObject = { coachEmail }
  }

  Request.find(sortObject)
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