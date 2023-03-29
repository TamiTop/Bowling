const Player = require('./player');

// Model that holds the game's data.
class Game {
    constructor() {
        this.players = {};
    }

    // Create a new player if doesnt exists, return player's instance.
    getPlayerData(name) {
        if (!this.players.name) this.players.name = new Player(name);
        return this.players.name;
    }

    // Return game's leaderboard.
    getLeaderBoard() {
        const leaderboard = {};
        for (const player of this.player) {
            leaderboard[player.name] = {
                scores: player.scores,
                rolls: player.rolls
            };
        }

        return leaderboard;
    }

    // needed?
    resetGame() {
        this.players = {};
    }
}

module.exports = Game;