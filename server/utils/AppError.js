class AppError extends Error {
  constructor(msg, statusCode = 500) {
    super(msg)
    // define my own enumerable properties so they
    // will show up in JSON automatically
    this.error = msg
    this.statusCode = statusCode
    this.status = 'failure'
  }
}

module.exports = AppError