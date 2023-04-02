// Model that holds data of each player
class Player {
    constructor(name) {
        this.name = name;
        this.rolls = []; // : [ frame ][ rolls ] => [[2,3][10,0][6,4]...[6,4,3]]
        this.currentFrame = 1;
    }

    // Add roll score and check if its closing the frame
    addRollScore(roll) {
        if (this.rolls[this.currentFrame - 1]) {
            this.rolls[this.currentFrame - 1].push(+roll);
        } else {
            this.rolls[this.currentFrame - 1] = [+roll];
            // On a strike push 0 as the second roll
            if (+roll === 10) {
                this.rolls[this.currentFrame - 1].push(0);
            }
        }
        if (this.isClosedFrame()) {
            ++this.currentFrame;
        }
    }

    // Check if the roll is closing the frame
    isClosedFrame() {
        const frameRolls = this.rolls[this.currentFrame - 1];

        if (this.currentFrame === 10) {
            const currentFrameScore = this.sumRollsOfFrame(this.rolls[this.currentFrame - 1]);

            // If the score is greater than 10 after third roll or the first two rolls didnt achieve a bonus
            if (currentFrameScore > 10 || (frameRolls.length === 2 && currentFrameScore < 10)) {
                return true;
            }
        } else if (frameRolls.length === 2) {
            return true;
        }

        return false;
    }

    // Return the sum of the rolls
    sumRollsOfFrame(rolls) {
        let frameRollScore = 0;

        for (const roll of rolls) {
            frameRollScore += roll;
        }

        return frameRollScore;
    }

    // Calculate player scores
    calculateScores() {
        const gameData = []; // : [{rolls: score: }{..]
        let previousRollBonus = 0;

        for (let i = 0; i < this.rolls.length; i++) {
            let frameRollScore = this.sumRollsOfFrame(this.rolls[i]);

            // Apply bonus on previous frame score
            if (previousRollBonus) {
                if (previousRollBonus >= 2) {
                    gameData[i - 1].score += frameRollScore;
                } else {
                    gameData[i - 1].score += this.rolls[i][0];
                }
                previousRollBonus = 0;
            }

            // If there is bonus to apply on the next frame
            if (frameRollScore === 10) {
                ++previousRollBonus;
                // Also a strike - add another bonus
                if (this.rolls[i][0] === 10) {
                    ++previousRollBonus;
                }
            }

            // Add last frame score to this frame
            if (gameData[i - 1]?.score) {
                frameRollScore += gameData[i - 1].score;
            }

            gameData.push({
                rolls: this.rolls[i],
                score: frameRollScore
            });
        }

        return gameData;
    }
}

module.exports = Player;