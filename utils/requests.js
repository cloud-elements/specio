const Request = require('../models/models').Request,
      ObjectId = require('mongodb').ObjectId,
      e = require('./error'),
      retrieveBucketId = require('./buckets').retrieveBucketId;

function insertRequest(req, res, next, bucketId){
  let request = {};
  request.bucket = bucketId;
  request.bucketName = req.params.bucketName;
  request.body = req.body ? req.body : null;
  request.headers = req.headers;
  request.url =  req.protocol + '://' + req.get('host') + req.originalUrl;
  request.params = req.query;
  request.method = req.method;
  Request.create(request, (err, result) => {
    if (err) return next(new e.InternalServerError(`Unable to accept request for bucket '${req.params.bucketName}'`));
    res.json(result);
  });
}

function findRequests(req, res, next, bucketId){
  let bucketName = req.params.bucketName;
    Request.find({bucket: ObjectId(bucketId)}).exec(function(err, requests) {
      if (err) {
        return next(new e.InternalServerError(`Error retrieving requests for '${bucketName}'`));
      } else if (requests.length == 0) {
        return next(new e.NotFound(`Bucket is empty`));
      } else {
        res.json(requests);
      }
    })
}

function removeRequestById(req, res, next, bucket) {
  _id = req.params.requestId;
  if(!_id) return next(new e.BadRequest('Must provide a request ID'));
  Request.findOneAndRemove({_id, bucket}, (err, result) =>{
    if (err) return next(new e.InternalServerError(`Failed to remove request '${_id}'`));
    if (!result) return next(new e.NotFound(`Unable to locate request with ID '${_id}'`));
    res.sendStatus(200);
  });
}

function retrieveRequestById(req, res, next, bucket) {
  let _id = req.params.requestId;
  if (!_id) return next(new e.BadRequest('Please provide a request ID for this operation'))
  let bucketName = req.params.bucketName;
  Request.findById({_id, bucket}).exec(function(err, requests) {
    if (err) {
      return next(new e.InternalServerError(`Error retrieving requests for '${bucketName}'`));
    } else if (requests.length == 0) {
      return next(new e.NotFound(`Unable to locate request '${_id}' for bucket with name '${bucketName}'`));
    } else {
      res.json(requests);
    }
  })
}

//retrieveBucketId validates the bucketId from the bucketName before performing operations on request documents
module.exports = {
  getRequests: (req, res, next) => {
    retrieveBucketId(req, res, next, findRequests);
  }, 
  getRequestById: (req, res, next) => {
    retrieveBucketId(req, res, next, retrieveRequestById);
  }, 
  createRequest: (req, res, next) => {
    retrieveBucketId(req, res, next, insertRequest);
  },
  deleteRequest: (req, res, next) => {
    retrieveBucketId(req, res, next, removeRequestById);
  }   
}
