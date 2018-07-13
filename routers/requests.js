const methods = require('../utils/requests'),
      router = require('express').Router({mergeParams: true});

router.route('/').all(methods.createRequest);
router.route('/summary')
.get(methods.getRequests);

router.route('/:requestId')
.get(methods.getRequestById)
.post(methods.createRequest)
.delete(methods.deleteRequest);

module.exports = router;