const express = require('express')
const router = express.Router();
const submissionController = require('../controllers/submission')

router.post(
  '/post', 
  submissionController.validate('createSubmission'), 
  submissionController.createSubmission,
)

router.get(
  '/list', 
  submissionController.getSubmissions,
)

module.exports = router;
