const Player = require('./player');

// Model that holds the game's data
class Game {
    constructor() {
        this.players = {};
    }

    // Create a new player if doesnt exists, return player's instance
    getPlayerData(name) {
        if (!this.players[name]) {
            this.players[name] = new Player(name);
        }
        return this.players[name];
    }

    // Return game's leaderboard
    getLeaderBoard() {
        const leaderboard = [];
        for (const [name, stats] of Object.entries(this.players)) {
            leaderboard.push({ name, scores: stats.scores, rolls: stats.rolls })
        }

        return leaderboard;
    }

    // Reset the game
    resetGame() {
        this.players = {};
    }
}

module.exports = Game;