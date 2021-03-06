const Request = require('../models/Request')
const Coach = require('../models/Coach')
const { catchAsync } = require('../utils/catchAsync')

exports.getRequests = catchAsync(async function (req, res, next) {
  const { userId, userRole } = res.locals.decoded
  sortObject = {}

  if (userRole === 'user') {
    const coachEmail = (await Coach.findById(userId)).email
    sortObject = { coachEmail }
  }

  let data = await Request.find(sortObject)
  const dataToClient = Request.toClient(data)

  res.status(200).json({ arrayRequests: dataToClient })
})

exports.addRequest = catchAsync(function (req, res, next) {
  return Request.create(req.body.data)
    .then((data) => res.status(201).json({ status: 'success created', ...data }))
})

exports.deleteRequestById = catchAsync(function (req, res, next) {
  return Request.deleteOne(req.params)
    .then(() => res.status(200).json({ status: 'success deleted' }))
})