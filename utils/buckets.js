const db = require('../db/db')('neverland'),
      Bucket = require('../models/models').Bucket;
      error = require('./error');

module.exports = {
  getBucket: (req, res) => {
    let name = req.params.bucketName;
    Bucket.find({name}).exec(function(err, bucket) {
        if(err) {
          error(500, `Error retrieving bucket with name '${name}'`, res, err);
        } else if (bucket.length == 0) {
          error(404, `Unable to locate bucket with name '${name}'`, res);
        } else {
          res.json(bucket);
        }
      });
  }, 
  createBucket: (req, res) => {
    Bucket.create(req.body, (err, result) => {
      if(err) error(500, `Unable to create bucket`, res, err);
      res.json(result);
    });
  },
  updateBucket: (name, bucket, res) => {
    Bucket.update({name}, {bucket}, (err, result) => {
    if(err) error(500, `Unable to update bucket with name of '${name}'`, res, err);
    res.json(result);
    });
  },
  deleteBucket: (name, res) => {
    Bucket.delete({name}, (err) => {
      if(err) error(500, `Unable to delete bucket with name of '${name}'`, err);
      res.sendStatus(200);
    })
  }
    
}
