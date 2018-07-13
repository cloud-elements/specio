const methods = require('../utils/buckets'),
      router = require('express').Router(),
      error = require('../utils/error');

router.use('/:bucketName/requests', require('./requests'))

router.route('/')
.post(methods.createBucket)
.all((req, res) => error(405, `${(req.method).toUpperCase()} not allowed on this endpoint`, res));

router.route('/:bucketName')
.get(methods.getBucket)
.delete(methods.deleteBucket)
.patch(methods.updateBucket);

module.exports = router;