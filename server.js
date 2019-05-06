const app = require('express')(),
  bodyParser = require('body-parser'),
  bucketRouter = require('./routers/buckets'),
  configs = require('./configs'),
  cors = require('cors'),
  e = require('./utils/error'),
  expressSwagger = require('express-swagger-generator')(app),
  fs = require('fs'),
  morgan = require('morgan'),
  winston = require('winston'),
  methodOverride = require('method-override'),
  path = require('path'),
  swaggerConfigs = require('./swaggerConfigs'),
  logDirectory = require('./configs').logDirectory,
  logFile = require('./configs').logFile;

if (!fs.existsSync(logDirectory)) {
  console.log(`Creating log directory ${logDirectory}`);
  fs.mkdirSync(logDirectory);
}
if (!fs.existsSync(`${logDirectory}/${logFile}`)) {
  console.log(`Creating log file ${logFile}`);
  fs.createWriteStream(`${logDirectory}/${logFile}`);
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `./${logDirectory}/${logFile}`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: true
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});
// Setup console and file loggers
app.use(morgan('combined', { stream: { write: (message, encoding) => { logger.info(message) } } }));
app.disable('x-powered-by');
app.use(methodOverride());
app.use(cors());
// TODO - Need to handle _all_ content-types for /buckets/:bucketName/requests endpoint 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
// app.use(bodyParser.raw({inflate: true, limit: '100kb', type: '*/*'}));

expressSwagger(swaggerConfigs);

app.route('/').all((req, res, next) => next(new e.NotFound(`Resource not found`)));
app.use('/buckets', bucketRouter);


app.route('/ping')
  .all((req, res, next) => res.sendStatus(200));

app.use((err, req, res, next) => {
  if (err.exception) console.error(err);
  res.status(getStatus(err.status)).json({ message: err.message });
});

initDb();

const port = process.env.PORT || configs.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}\n`));

// TODO - need better approach
function initDb() {
  require('./db/db');
}

const getStatus = (statusCode) => statusCode >= 100 && statusCode < 600 ? statusCode : 500;

// TODO - need better approach
// function validateContentTypeHeader(req, cb) {
//       if(Object.keys(req.headers).filter(key => key.toLowerCase() === 'content-type').length === 0) 
//       return cb(new e.BadRequest('Must include Content-Type header'));
//       if(req.headers['content-type'] != 'application/json') return cb(new e.BadRequest('Must provide valid JSON for this endpoint'))
//       return;
// }

//TODO - need better approach
// app.post('*',function(req,res, next) {
//       if(!req.path.endsWith('/requests'))
//       validateContentTypeHeader(req,next);
//       next();// ensure application/json for all requests besides /buckets/:bucketName/requests
// });
// app.patch('*',function(req,res,next) {
//       if(!req.path.endsWith('/requests'))
//       validateContentTypeHeader(req,next);// ensure application/json for all requests besides /buckets/:bucketName/requests
//       next();
// });