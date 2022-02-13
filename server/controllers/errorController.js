/* exports.globalErrorHandler = (err, req, res, next) => {
  console.log('Catch by bus handler...', err.message)

  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
} */