var mongoose = require('mongoose');
const configs = require('../configs');

mongoose.connect(configs.mongoUrl + configs.dbName, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = { mongoose }