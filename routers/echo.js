const router = require('express').Router(),
      e = require('../utils/error');

router.route('/')
  /**
   * @route POST /echo
   * @returns {any} 200 - The created bucket
   * @returns {Error}  default - Unexpected error
   */
  .all((req, res, next) => {
    const request = {
      method: req.method,
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      query: req.query,
      body : req.body || null,
      rawBody: req.body,
      headers: req.headers
    };

    // if (err) return next(new e.InternalServerError(`Unable to accept request for bucket '${req.params.bucketName}'. Error: ${JSON.stringify(err)}`, err));
    res.json(request);
  });

  module.exports = router;