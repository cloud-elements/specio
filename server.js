const app = require('express')(),
      methodOverride = require('method-override'),
      cors = require('cors'),
      path = require('path'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      configs = require('./configs'),
      bucketRouter = require('./routers/buckets'),
      logger = require('morgan');

const port = process.env.PORT || configs.port || 3000;

// logging - `flag:a` is for appending to the log
let logStream = fs.createWriteStream(path.join(__dirname, './logs/', 'buckets.log'), {flags: 'a'}); 
app.use(logger('combined', {stream: logStream}));


app.use(methodOverride());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.text({type: 'text/plain'}));

app.route('/').all((req, res) => {
      res.status(400).json({message: `Unable to access this path`});
})
app.use('/buckets', bucketRouter);

app.listen(port, () => console.log('Listening on 3000!'));


