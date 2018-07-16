const methods = require('../utils/requests'),
      router = require('express').Router({mergeParams: true}),
      e = require('../utils/error');

// TODO - need way to document this in Swagger
router.route('/').all(methods.createRequest);

router.route('/summary')
/**
 * @route GET /buckets/{bucketName}/requests/summary
 * @group requests - Get a list of requests for a given bucket
 * @param {string} bucketName.path.required - Name of the bucket
 * @returns {Array<Request>} 200 - The requests contained within the specified bucket
 * @returns {Error}  default - Unexpected error
 */
.get(methods.getRequests)
.all((req, res, next) => next(new e.MethodNotAllowed(`${(req.method).toUpperCase()} not allowed on this endpoint`)));;

router.route('/:requestId')
/**
 * @route GET /buckets/{bucketName}/requests/{requestId}
 * @group requests - Get a request by ID
 * @param {string} bucketName.path.required - Name of the bucket
 * @param {string} requestId.path.required - ID of the request
 * @returns {Request.model} 200 - The request
 * @returns {Error}  default - Unexpected error
 */
.get(methods.getRequestById)
/**
 * @route DELETE /buckets/{bucketName}/requests/{requestId}
 * @group requests - Get a request by ID
 * @param {string} bucketName.path.required - Name of the bucket
 * @param {string} requestId.path.required - ID of the request
 * @returns {"OK"} 200 - Empty response
 * @returns {Error}  default - Unexpected error
 */
.delete(methods.deleteRequest)
.all((req, res, next) => next(new e.MethodNotAllowed(`${(req.method).toUpperCase()} not allowed on this endpoint`)));;

module.exports = router;


/**
 * @typedef Request
 * @property {string} id
 * @property {object} body
 * @property {string} createdDate
 * @property {string} updatedDate
 * @property {object} headers
 * @property {string} bucket
 * @property {string} bucketName
 * @property {string} url
 * @property {object} params
 * @property {string} method
 */

 /**
 * @typedef Error
 * @property {string} code.required
 */