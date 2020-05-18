const express = require('express')
const router = express.Router();
const uBountyController = require('../controllers/ubounty')

router.get(
  '/',
  (req, res, next) => {
    res.send('hello')
  }
)

router.get(
  '/test',
  (req, res, next) => {
    res.send('test')
  }
)

router.post(
  '/post', 
  uBountyController.validate('createUBounty'), 
  uBountyController.createUBounty,
)

module.exports = router;
