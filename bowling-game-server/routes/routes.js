const router = require('express').Router();
const controller = require('../controllers/controllers').getInstance();

// Add player's roll score
router.get('/addRollScore', controller.addRollScore.bind(controller));

// Get leaderboard
router.get('/getLeaderboard', controller.getLeaderboard.bind(controller));

// Reset the game
router.get('/resetGame', controller.resetGame.bind(controller));

module.exports = router;