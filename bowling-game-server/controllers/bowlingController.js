const Game = require('../models/game');

class BowlingController {
    constructor() {
        this.game = new Game();
    }

    // Singleton 
    static getInstance() {
        if (!BowlingController.instance) {
            BowlingController.instance = new BowlingController();
        }

        return BowlingController.instance;
    }

    addRollScore(req, res) {
        const rollScore = req.query.roll;
        const name = req.query.name;

        try {
            if (!name || !rollScore || isNaN(rollScore) || +rollScore > 10) {
                throw new Error('Bad request');
            }

            if (this.game.isGameEnded(name)) {
                throw new Error('Game over');
            }

            this.game.addRollScore(name, rollScore);
            res.sendStatus(200);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    getLeaderboard(req, res) {
        try {
            const leaderboard = this.game.getLeaderBoard();
            res.status(200).send(leaderboard);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    resetGame(req, res) {
        this.game.resetGame();
        res.status(200).send('Game restarted');
    }

    checkStatus(req, res) {
        res.status(200).send('Up and running');
    }
}

module.exports = BowlingController;