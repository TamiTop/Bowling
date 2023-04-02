const Player = require('./player');

// Model that holds the game's data
class Game {
    constructor() {
        this.players = {};
    }

    // Create a new player if doesnt exists, return player's instance
    getPlayer(name) {
        if (!this.players[name]) {
            this.players[name] = new Player(name);
        }

        return this.players[name];
    }

    // Return game's leaderboard
    getLeaderBoard() {
        const leaderboard = [];

        for (const playerName in this.players) {
            const player = this.getPlayer(playerName);
            leaderboard.push({
                name: player.name,
                stats: player.calculateScores()
            });
        }

        return leaderboard;
    }

    addRollScore(name, roll) {
        const player = this.getPlayer(name);
        player.addRollScore(roll)
    }

    isGameEnded(name) {
        const player = this.getPlayer(name);
        return player.currentFrame > 10;
    }

    resetGame() {
        this.players = {};
    }
}

module.exports = Game;