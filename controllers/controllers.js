const Game = require('../models/game');
const game = new Game(); // move to app.js?

// Add players roll score.
const addRollScore = (req, res) => {
    const score = req.query.score;
    const name = req.query.name;

    if (!name || !score || isNaN(score) || +score > 10) {
        res.sendStatus(400);
    } else {
        const player = game.getPlayerData(name);
        if (player.frameIndex !== -1) player.calculateScore(+score);
        console.table(player);
        res.sendStatus(200);
    }
}

// Get leaderboard.
const getLeaderboard = (req, res) => {
    const leaderboard = game.getLeaderBoard();
    res.status(200).send(leaderboard);
}

module.exports = { addRollScore, getLeaderboard };