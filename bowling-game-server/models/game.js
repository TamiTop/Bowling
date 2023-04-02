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

        console.log(this.players);
        for (const player of Object.keys(this.players)) {
            const playerScores = this.players[player].calculateScores();
            console.log(playerScores);
            leaderboard.push({ name: this.players[player].name, stats: playerScores })
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