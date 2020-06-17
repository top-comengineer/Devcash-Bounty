const express = require('express')
const router = express.Router();
const statsController = require('../controllers/stats')

router.get(
  '/overview', 
  statsController.getOverviewStats,
)

module.exports = router;
