module.exports = function(statusCode, message, res, ...error) {
  return res.status(statusCode).json(error ? {message, error} : {message});
}