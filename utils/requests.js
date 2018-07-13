const db = require('../db/db')('neverland'),
      Request = require('../models/models').Request,
      error = require('./error');

module.exports = {
  getRequests: (req, res) => {
    let bucketName = req.params.bucketName;
    Request.find({bucketName: bucketName}).exec(function(err, requests) {
      if(err) {
        res.status(500).json({error: `Error retrieving requests for '${bucketName}'`});
      } else if (requests.length == 0) {
        res.status(404).json({message: `Unable to locate any requests for bucket with name '${bucketName}'` })
      } else {
        res.json(requests);
      }
    })
  }, 
  getRequestById: (req, res) => {
    let bucketName = req.params.bucketName;
    let requestId = req.params.requestId
    Request.find({bucket: bucketName, requestId}).exec(function(err, requests) {
      if(err) {
        res.status(500).json({error: `Error retrieving requests for '${bucketName}'`});
      } else if (requests.length == 0) {
        res.status(404).json({message: `Unable to locate any requests for bucket with name '${bucketName}'` })
      } else {
        res.json(requests);
      }
    })
  }, 
  createRequest: (req, res) => {
    let request = {};
    request.body = req.body ? req.body : null;
    request.headers = req.headers;
    console.log(JSON.stringify(req.headers))
    request.url =  req.protocol + '://' + req.get('host') + req.originalUrl;
    request.params = req.query
    request.method = req.method;
    Request.create(request, (err, result) => {
      console.log(JSON.stringify(err));
      if(err) error(500, `Unable to accept request for bucket`, res, err);
      res.json(result)
    });
  },
  updateRequest: (req, res) => {
    // models.Request.update({
    //   bucketName: req.params.bucketName, 
    //   requestId: req.params.requestId
    // }, req.body)
    
    //finish this method
  },
  deleteRequest: (req, res) => {

  }
    
}
