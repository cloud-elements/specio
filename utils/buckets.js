const Bucket = require('../models/models').Bucket,
      Request = require('../models/models').Request,
      e = require('./error');

function retrieveBucketId(req, res, next, cb) {
  let name = req.params.bucketName;
  if (!name) return next(new e.BadRequest('Bucket name not found'));
  Bucket.findOne({name}).exec(function(err, bucket){
    if (err) return next(new e.InternalServerError(`Unable to retrieve bucket`));
    if (!bucket) return next(new e.NotFound(`Unable to locate bucket with name '${name}'`));
    cb(req, res, next, bucket._id);
  });
}
function removeBucket(req, res, next, bucket){
  Request.deleteMany({bucket}, (err) => {
    if (err) return next(new e.InternalServerError(`An error occurred while attempting to delete bucket '${req.params.bucketName}'`));
    Bucket.deleteOne({_id: bucket}, (err) => {
      if (err) return next(new e.InternalServerError(`Successfully deleted requests but unable to delete bucket with name of '${req.params.bucketName}'`));
      res.sendStatus(200);
    });
  });
}
// function removeBucket(bucketId) {
//   Bucket.remove({name}, (err, result) => {
//     if (err) return next(new e.InternalServerError(`An error occurred while attempting to delete bucket '${name}'`));
//     if (result.n === 0) return next(new e.NotFound(`Bucket with name '${name}' was not found`));
//     res.sendStatus(200)
//   });
// }
module.exports = {
  getBucket: (req, res, next) => {
    let name = req.params.bucketName;
    Bucket.findOne({name}).exec(function(err, bucket) {
        
        if (err) {
          return next(new e.InternalServerError(`Error retrieving bucket with name '${name}'`));
        } else if (!bucket) {
          return next(new e.NotFound(`Unable to locate bucket with name '${name}'`));
        } else {
          res.json(bucket);
        }
      });
  }, 
  createBucket: (req, res, next) => {
    if (!req.body.name) return next(new e.BadRequest(`Must provide bucket name`));
    Bucket.create(req.body, (err, result) => {
      if (err) {
        if (err.code === 11000) {
          return next(new e.Conflict(`Bucket '${req.body.name}' already exists`))
        } else {
          return next(new e.InternalServerError(`Unable to createBucket with name of '${req.body.name}'`));
        }
      };
      res.json(result);
    });
  },
  updateBucket: (req, res, next) => {
    let name = req.params.bucketName;
    let newName = req.body.name;
    if (!newName) return next(new e.BadRequest('Only name is updateable'));
    Bucket.findOneAndUpdate({name}, {$set:{name: newName, updatedDate: new Date()}}, {new :true}, (err, result) => {
      if (!err && !result) return next(new e.NotFound(`Unable to locate bucket '${name}'`));
      if (err){
        if (err.code === 11000) {
          return next(new e.Conflict(`Bucket with ${newName} already exists`))
        } else {
          return next(new e.InternalServerError(`Unable to update bucket with name of '${name}'`));
        }
      } 
      res.json(result);
    });
  },
  deleteBucket: (req, res, next) => {
    retrieveBucketId(req, res, next, removeBucket);
  },
  retrieveBucketId: retrieveBucketId  
}
