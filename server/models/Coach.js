const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const coachSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password has to include at least 6 symbols']
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'First name has to include at least 2 symbols']
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Last name has to include at least 2 symbols']
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
    minlength: [2, 'description has to include at least 10 symbols']
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: [0, 'You can\'t use negative value']

  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

coachSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
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