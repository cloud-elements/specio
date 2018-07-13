var mongoose = require('mongoose');
const configs = require('../configs');

module.exports = (dbName) => {
  mongoose.connect(configs.mongoUrl + configs.db[dbName], { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  return mongoose;
}







