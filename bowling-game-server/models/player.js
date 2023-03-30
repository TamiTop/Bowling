// Model that holds data of each player
class Player {
    constructor(name) {
        this.name = name;
        this.scores = [];
        this.rolls = []; // Array of arrays
        this.bonusCount = 0;
        this.frameIndex = 0;
    }

    // Score calculation logic
    calculateScore(rollScore) {
        // First roll
        if (this.rolls.length === 0 && this.scores.length === 0) {
            this.rolls.push([rollScore]);
            this.scores.push(rollScore);
        } else {

            // Apply bonus score from a spare or a strike
            if (this.bonusCount) {
                this.scores[this.frameIndex - 1] += rollScore;
                --this.bonusCount;
            }

            // 3rd roll after a spare or a strike on the last round
            if (this.frameIndex === 10) {
                if (this.bonusCount && this.rolls[9].length === 2) {
                    this.rolls[9].push(rollScore);
                    this.scores[9] += rollScore;
                }
                // Update frame index to -1 to let the system know that the player is done playing
                this.frameIndex = -1;
            } else {

                // Add second frame's roll
                if (this.rolls[this.frameIndex] && this.rolls[this.frameIndex].length < 2) {

                    // If the frame is a spare
                    if (this.rolls[this.frameIndex][0] + rollScore === 10) {
                        ++this.bonusCount;
                    } else if (this.rolls[this.frameIndex][0] + rollScore < 10) { // bad input - return error?
                        this.rolls[this.frameIndex].push(rollScore);
                        this.scores[this.frameIndex] += rollScore;
                        ++this.frameIndex;
                    }
                } else {

                    // Add next frame's first roll
                    this.rolls.push([rollScore]);
                    this.scores.push(this.scores[this.frameIndex - 1] + rollScore);
                }

                // If the frame is a strike
                if (rollScore === 10) {
                    this.bonusCount = 2;
                    this.rolls.at(-1).push(0);
                    ++this.frameIndex;
                }
            }
        }

    }
}

module.exports = Player;