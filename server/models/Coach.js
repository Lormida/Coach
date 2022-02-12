const { Schema, model } = require('mongoose')

const coachSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  skills: [{
    type: String,
  }],
  description: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

coachSchema.statics.toClient = function (coaches) {
  return coaches.map(coach => {
    const { email, firstName, lastName, gender, skills, description, hourlyRate, password, _id: id } = coach._doc
    return {
      email, firstName, lastName, gender, skills, description, password, hourlyRate,
      id: String(id)
    }
  })
}


module.exports = model('Coach', coachSchema)