const Player = require('./player');

// Model that holds the game's data
class Game {
    constructor() {
        this.players = {};
    }

    // Create a new player if doesnt exists, return player's instance
    getPlayerData(name) {
        if (!this.players[name]) this.players[name] = new Player(name);
        return this.players[name];
    }

    // Return game's leaderboard
    getLeaderBoard() {
        const leaderboard = [];
        for (const [key, value] of Object.entries(this.players)) {
            leaderboard.push({ name: key, scores: value.scores, rolls: value.rolls })
        }

        return leaderboard;
    }

    // Reset the game
    resetGame() {
        this.players = {};
    }
}

module.exports = Game;