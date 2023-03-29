const router = require('express').Router();
const controller = require('../controllers/controllers');

// Add player's roll score.
router.get('/addRollScore', controller.addRollScore);

// Get leaderboard.
router.get('/getLeaderboard', controller.getLeaderboard);

module.exports = router;