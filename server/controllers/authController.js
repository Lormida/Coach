const Coach = require('../models/Coach')
const bcrypt = require('bcrypt')
const { secretKey } = require('../secret')
const jwt = require('jsonwebtoken')

const createToken = (userId, userRole) => {
  return jwt.sign({ userId, userRole }, secretKey, { expiresIn: 60 * 60 * 1000 })
}

exports.createCoach = async function (req, res, next) {
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
    .then(() => {
      return new Promise((resolve, reject) => {
        bcrypt.hash(req.body.data.password, 10, (err, hash) => {
          if (err) {
            reject(err)
          }
          resolve(hash)
        })
      })
    })
    .then((hash) => {
      return Coach.create({ ...req.body.data, password: hash })
    })
    .then((data) => res.status(200).json({ status: 'success created', data }))
    .catch(err => res.status(401).json({ error: err }))
}

exports.loginCoach = function (req, res) {
  const { email, password } = req.body

  Coach.findOne({ email })
    .then(coach => {
      return new Promise((resolve, reject) => {
        if (coach) {
          resolve(coach)
        }
        reject('Coach with given email doesn\t exists')
      })
    })
    .then(coach => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, coach.password, (err, concurrence) => {
          if (err) {
            reject(err)
          } else if (!concurrence) {
            reject('Incorrect password')
          }
          resolve(coach)
        })

      })
    })
    .then(coach => {
      const token = createToken(coach._id, coach.role)
      // Set jwt token
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 60 * 1000)
      })
      return res.status(201).json({ data: coach, status: 'success' })
    })
    .catch(err => res.status(401).json({ error: err }))
}

exports.isAuth = function (roles) {
  return function (req, res, next) {
    try {

      const token = req.cookies.jwt

      if (!token) {
        console.log('Token not exists')
        throw new Error()
      }
      const { userRole } = jwt.decode(token, secretKey)
      if (roles && !roles.includes(userRole)) {
        console.log('Error role')
        return res.status(407).json({ error: 'You don\'t have permission to given operation!' })
      }

      return next()

    } catch (err) {
      return res.status(411).json({ error: 'Anauthorized user' })
    }
  }
}

exports.loadAuthUser = async function (req, res, next) {
  let token = req.cookies.jwt
  try {
    if (token) {
      let { userId } = jwt.decode(token, secretKey)
      let userAuth = await Coach.findById(userId)
      return res.status(203).json({ data: userAuth.email })
    }
    console.log('token isnt exists!')
    return res.status(202).json({ err: 'Token isnt exists!' })
  }
  catch (err) {
    console.log('invalid token!')
    return res.status(201).json({ err: 'Invalid token' })

  }
}

exports.logout = function (req, res, next) {
  // Удаляем из куки
  res.clearCookie("jwt")
  return res.status(201).json({ status: 'success', message: 'You were logout!' })

}

exports.filterRequestsByRoles = function (req, res, next) {
  const { userId, userRole } = jwt.decode(req.cookies.jwt, secretKey)
  res.locals.userId = userId
  res.locals.userRole = userRole
  next()
}