const express = require('express')
const router = express.Router();
const uBountyController = require('../controllers/ubounty')

router.post(
  '/post', 
  uBountyController.validate('createUBounty'), 
  uBountyController.createUBounty,
)

router.get(
  '/list', 
  uBountyController.getUBounties,
)

module.exports = router;
