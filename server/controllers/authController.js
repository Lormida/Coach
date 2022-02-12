const Coach = require('../models/Coach')
const bcrypt = require('bcrypt')
const { secretKey } = require('../secret')
const jwt = require('jsonwebtoken')
const { catchAsync } = require('../utils/catchAsync')

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
          reject(new Error('Coach exists!'))
        }
        resolve(req.body.data)
      })
    })
    // User doesn't exists -> create him
    .then(() => {
      return Coach.create({ ...req.body.data })
    })
    .then((data) => res.status(200).json({ status: 'success created', data }))
})

exports.loginCoach = catchAsync(function (req, res) {
  const { email, password } = req.body

  return Coach.findOne({ email })
    .then(coach => {
      return new Promise((resolve, reject) => {
        if (coach) {
          resolve(coach)
        }
        reject(new Error('Coach with given email doesn\t exists'))
      })
    })
    .then(coach => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, coach.password, (err, concurrence) => {
          if (err) {
            reject(new Error('Error during comparing passwords'))
          } else if (!concurrence) {
            reject(new Error('Incorrect password'))
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
      return res.status(201).json({ data: coach, status: 'success' })
    })
})

exports.isAuth = function (roles) {
  return catchAsync(function (req, res, next) {
    return new Promise((resolve, reject) => {
      const token = req.cookies.jwt
      if (!token) {
        reject(new Error('Anauthorized user. Token not exists!'))
      }
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject(new Error('Error validation JWT!'))
        }
        const { userRole } = decoded
        if (roles && !roles.includes(userRole)) {
          reject(new Error('Error role. You don\'t have permission to given operation!'))
        }
        resolve(next())
      })
    })
  })
}

exports.loadAuthUser = catchAsync(async function (req, res) {
  let token = req.cookies.jwt
  if (token) {
    let { userId } = jwt.decode(token, secretKey)
    let userAuth = await Coach.findById(userId)
    return res.status(203).json({ data: userAuth.email })
  }
})

exports.logout = function (req, res) {
  // Удаляем из куки
  res.clearCookie("jwt")
  return res.status(201).json({ status: 'success', message: 'You were logout!' })

}

exports.filterRequestsByRoles = catchAsync(function (req, res, next) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.jwt, secretKey, (err, decoded) => {
      if (err) {
        reject(new Error('JWT is exists, but it\'s incorrect, re-login'))
      }
      const { userId, userRole } = decoded

      res.locals.userId = userId
      res.locals.userRole = userRole

      resolve(next())
    })
  })
})