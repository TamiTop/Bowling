const Game = require('../models/game');

class Controllers {
    constructor() {
        this.game = new Game();
    }

    static getInstance() {
        if (!Controllers.instance) {
            Controllers.instance = new Controllers();
        }

        return Controllers.instance;
    }

    addRollScore(req, res) {
        const score = req.query.score;
        const name = req.query.name;

        if (!name || !score || isNaN(score) || +score > 10) {
            res.sendStatus(400);
        } else {
            const player = this.game.getPlayerData(name);
            if (player.frameIndex !== -1) {
                player.calculateScore(+score);
                console.table(player);
                res.sendStatus(200);
            } else {
                res.status(400).send(`${name} is done playing, you can reset the game to start over.`);
            }
        }
    }

    getLeaderboard(req, res) {
        const leaderboard = this.game.getLeaderBoard();
        res.status(200).send(leaderboard);
    }

    resetGame(req, res) {
        this.game.resetGame();
        res.status(200).send('Game restarted.');
    }
}

module.exports = Controllers;