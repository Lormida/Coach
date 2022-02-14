const Coach = require('../models/Coach')
const bcrypt = require('bcrypt')
const { secretKey } = require('../secret')
const jwt = require('jsonwebtoken')
const { catchAsync } = require('../utils/catchAsync')
const createError = require('http-errors')

const createToken = (userId, userRole) => {
  return jwt.sign({ userId, userRole }, secretKey, { expiresIn: 60 * 60 * 1000 })
}

exports.createCoach = catchAsync(function (req, res, next) {
  let email = req.body.data.email
  return Coach.findOne({ email })
    // Check exists user or not
    .then(coach => {
      return new Promise((resolve, reject) => {
        if (coach) {
          return reject(new createError(400, 'Coach exists!'))
        }
        resolve(req.body.data)
      })
    })
    // User doesn't exists -> create him
    .then(() => {
      return Coach.create({ ...req.body.data })
    })
    .then((data) => res.status(201).json({ status: 'success', message: 'The coach was be created!', data }))
})

exports.loginCoach = catchAsync(function (req, res) {
  const { email, password } = req.body

  return Coach.findOne({ email })
    .then(coach => {
      return new Promise((resolve, reject) => {
        if (coach) {
          resolve(coach)
        }
        reject(new createError(400, 'Coach with given email doesn\t exists'))
      })
    })
    .then(coach => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, coach.password, (err, concurrence) => {
          if (err) {
            return reject(new createError(500, 'Error during comparing passwords'))
          }
          else if (!concurrence) {
            return reject(new createError(401, 'Incorrect password'))
          }

          resolve(coach)
        })
      })
    })
    .then(coach => {
      const token = createToken(coach._id, coach.role)
      // Set jwt token
      res.cookie("jwt", token, {
        // httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
      })
      return res.status(200).json({ data: coach, status: 'success', message: 'You were login!' })
    })
})
exports.isAuth = catchAsync(function (req, res, next) {
  return new Promise((resolve, reject) => {
    const token = req.cookies.jwt

    if (!token) {
      return reject(new createError(401, 'Anauthorized user. Token not exists!'))
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(new createError(401, 'Error validation JWT!'))
      }
      res.locals.decoded = decoded
      resolve(next())
    })
  })
})

exports.hasPermission = function (roles) {
  return catchAsync(function (req, res, next) {
    return new Promise((resolve, reject) => {
      const { userRole } = res.locals.decoded
      if (roles && !roles.includes(userRole)) {
        return reject(createError(405, 'Error role. You don\'t have permission to given operation!'))
      }
      resolve(next())
    })
  })
}

exports.loadAuthUser = catchAsync(async function (req, res) {
  let token = req.cookies.jwt
  if (token) {
    let { userId } = jwt.decode(token, secretKey)
    let userAuth = await Coach.findById(userId)
    return res.status(200).json({ data: userAuth.email })
  }
})

exports.logout = function (req, res) {
  // Удаляем из куки
  res.clearCookie("jwt")
  return res.status(200).json({ status: 200, message: 'You were logout!' })

}