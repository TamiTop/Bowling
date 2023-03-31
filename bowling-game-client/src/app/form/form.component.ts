import { Component, Output, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  // Emit to the parent component when the game is complete to hide the form and show the leaderboard results
  //@Output() gameComplete = new EventEmitter<boolean>();

  // Api URLs
  private serverUrl = "http://localhost:4200";
  private addRollApiUrl = "/addRollScore";
  private getLeaderboardApiUrl = "/getLeaderboard;";

  // Data holders
  public gameOver = false;
  public frameNumber = 1;
  public playerScore = '';
  public playerName = '';
  public playerNames: string[] = [];

  // Error handling
  public playerError = '';
  public scoreError = '';
  public nextFrameError = '';

  // Contains the player names and the number of their rolls
  private playerFrameRolls = {};

  //~~~~~~~ Methods ~~~~~~~
  // Submit button clicked
  public onSubmit(): void {
    this.playerName = this.playerName.trim();
    this.playerError = '';
    this.scoreError = '';

    this.validateSubmition();
    if (!this.playerError && !this.scoreError) {
      this.nextFrameError = '';
      this.addRollScore();
    }

    console.log(`${this.playerName} scored ${this.playerScore}`);
  }

  // Move to the next frame button is clicked
  public nextFrame(): void {
    this.validateFrameCondition();

    // Continue to the next frame
    if (!this.nextFrameError) {
      if (this.frameNumber < 10) {
        // Reset frame rolls count
        for (let player of Object.keys(this.playerFrameRolls)) {
          if (this.frameNumber === 1) this.playerNames.push(player);
          this.playerFrameRolls[player] = 0;
        }
        ++this.frameNumber;
      } else {
        //this.gameOver = true;
        // hide form and show leader score board
      }
    }
  }

  public resetGameScores() {
    this.gameOver = false;
    this.frameNumber = 1;
    this.playerFrameRolls = {};
    // http request to reset game on server
  }

  // Validate submition - the user can register up to 4 players, and 2 rolls for each frame (except for the last one if the player scored a strike or a spare)
  private validateSubmition(): void {
    this.playerError = '';

    // add missing by name on each frame ****
    if (!this.playerFrameRolls[this.playerName]) {
      // Maximum of 4 players on each game
      if (Object.keys(this.playerFrameRolls).length === 4) {
        this.playerError = 'Already registered 4 players.';
      } else {
        // Register new player
        this.playerFrameRolls[this.playerName] = [+this.playerScore];
        // On strike, there won't be 2nd  roll on the current frame, therefore the next roll will be 0
        if (+this.playerScore === 10) {
          this.playerFrameRolls[this.playerName].push(0);
        }
      }
    } else if (this.playerFrameRolls[this.playerName].length < 2) {
      // Validate that the second score is not greater than 10
      if (this.playerFrameRolls[this.playerName][0] + +this.playerScore > 10) {
        this.scoreError = `Score of both rolls cannot be greater than 10, previous roll was ${this.playerFrameRolls[this.playerName][0]}`;
      } else {
        this.playerFrameRolls[this.playerName].push(+this.playerScore);
      }
      // Accept 3rd roll on the tenth frame after a spare or a strike
    } else if (this.frameNumber === 10 && this.isSpareOrStrike(this.playerFrameRolls[this.playerName])) {
      this.playerFrameRolls[this.playerName].push(+this.playerScore);
    } else {
      this.playerError = `Already registered 2 rolls of this player.`;
    }
  }

  // Check that each player has two rolls 
  private validateFrameCondition(): void {
    console.log(this.playerFrameRolls);
    for (let player of Object.keys(this.playerFrameRolls)) {
      if (this.playerFrameRolls[player] < 2) {
        this.nextFrameError += `"${player}" is missing a roll score.`;
        break;
      }
    }
  }

  // Check if the player had a spare or a strike
  private isSpareOrStrike(arr: number[]): boolean {
    const rollsSum = arr.reduce((a, b) => {
      return a + b;
    })

    if (rollsSum === 10) return true;
    return;
  }

  // Send an http request to the server
  private addRollScore(): void {

  }
}
