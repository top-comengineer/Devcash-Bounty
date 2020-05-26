const express = require('express')
const router = express.Router();
const revisionController = require('../controllers/revision')

router.post(
  '/post', 
  revisionController.validate('createRevision'), 
  revisionController.createRevision,
)

module.exports = router;
