const { Schema, model } = require('mongoose')

const requestSchema = new Schema({
  coachEmail: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactMessage: {
    type: String,
    required: true
  },
})

requestSchema.statics.toClient = function (requests) {
  return requests.map(request => {
    const { coachEmail, contactEmail, contactMessage, _id: id } = request._doc
    return {
      coachEmail, contactEmail, contactMessage,
      id: String(id)
    }
  })
}

module.exports = model('Request', requestSchema)