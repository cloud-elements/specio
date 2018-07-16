const app = require('express')(),
      bodyParser = require('body-parser'),
      bucketRouter = require('./routers/buckets'),
      configs = require('./configs'),
      cors = require('cors'),
      e = require('./utils/error'),
      expressSwagger = require('express-swagger-generator')(app),
      fs = require('fs'),
      logger = require('morgan'),
      methodOverride = require('method-override'),
      path = require('path'),
      swaggerConfigs = require('./swaggerConfigs');


app.disable('x-powered-by');
// logging - `flag:a` is for appending to the log
let logStream = fs.createWriteStream(path.join(__dirname, './logs/', 'buckets.log'), {flags: 'a'}); 
app.use(logger('combined', {stream: logStream}));
app.use(methodOverride());
app.use(cors());
// TODO - Need to handle _all_ content-types for /buckets/:bucketName/requests endpoint 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

const port = process.env.PORT || configs.port || 3000;

expressSwagger(swaggerConfigs);

app.route('/').all((req, res, next) => {
      return next(new e.NotFound(`Resource not found`));
})


app.use('/buckets', bucketRouter);
app.use(function(err, req, res, next){
      res.status(err.status).json({message: err.message});
});
initDb();
app.listen(port, () => console.log('Listening on port ' + port));

// TODO - need better approach
function initDb() {
      require('./db/db');
}

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