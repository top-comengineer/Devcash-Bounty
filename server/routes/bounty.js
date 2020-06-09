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

router.get(
  '/listpersonal', 
  uBountyController.getPersonalUbounties,
)

router.get(
  '/listcreated', 
  uBountyController.getCreatorUbounties,
)

router.get(
  '/one', 
  uBountyController.getUBounty,
)

module.exports = router;
