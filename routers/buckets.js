const methods = require('../utils/buckets'),
      router = require('express').Router(),
      e = require('../utils/error');

router.use('/:bucketName/requests', require('./requests'))

router.route('/')
/**
 * @route POST /buckets
 * @group buckets - Create a bucket
 * @param {BucketPayload.model} bucket.body.required - The bucket to create
 * @returns {Bucket.model} 200 - The created bucket
 * @returns {Error}  default - Unexpected error  
 * @produces application/json
 * @consumes application/json
 */
.post(methods.createBucket)
.all((req, res, next) => next(new e.MethodNotAllowed(`${(req.method).toUpperCase()} not allowed on this endpoint`)));

router.route('/:bucketName')
/**
 * @route GET /buckets/{bucketName}
 * @group buckets - Retrieve a bucket by name
 * @param {string} bucketName.path.required - Name of the bucket
 * @returns {Bucket.model} 200 - The bucket
 * @returns {Error}  default - Unexpected error
 */
.get(methods.getBucket)
/**
 * @route PATCH /buckets/{bucketName}
 * @group buckets - Update a bucket
 * @param {string} bucketName.path.required - Name of the bucket
 * @param {BucketPayload.model} bucket.body.required - The bucket to update
 * @returns {Bucket.model} 200 - The updated bucket
 * @returns {Error}  default - Unexpected error
 */
.patch(methods.updateBucket)
/**
 * @route DELETE /buckets/{bucketName}
 * @group buckets - Delete a bucket
 * @param {string} bucketName.path.required - Name of the bucket to delete
 * @returns {"OK"} 200 - Confirmation bucket was deleted
 * @returns {Error}  default - Unexpected error
 */
.delete(methods.deleteBucket)
.all((req, res, next) => next(new e.MethodNotAllowed(`${(req.method).toUpperCase()} not allowed on this endpoint`)));;

module.exports = router;

/**
 * @typedef Bucket
 * @property {string} id
 * @property {string} name.required - Bucket name
 * @property {string} createdDate
 * @property {string} updatedDate
 */

/**
 * @typedef BucketPayload
 * @property {string} name.required - Bucket name
 */

 /**
 * @typedef Error
 * @property {string} code.required
 */