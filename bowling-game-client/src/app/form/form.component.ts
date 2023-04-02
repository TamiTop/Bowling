import { Component, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import axios from 'axios';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  // Emit to the parent component when the game is complete to hide the form and show the leaderboard results
  @Output() isGameOver = new EventEmitter<boolean>();

  // Api URL
  private readonly addRollApiUrl = `${this.appService.apiUrl}addRollScore`;

  // Data holders
  public frameNumber = -1;
  public playerScore = '';
  public playerName = '';
  public formLog = '';

  // Error handling
  public playerError = '';
  public scoreError = '';
  public nextFrameError = '';

  // Contains the player names and their rolls
  private playerFrameRolls = {};

  constructor(
    private appService: AppService,
  ) {}

  //~~~~~~~ Methods ~~~~~~~
  // Submit button clicked
  public onSubmit(): void {
    // Game started
    if (this.frameNumber === -1) {
      this.frameNumber = 1;
    }

    this.playerName = this.playerName.trim();
    this.clearErrors();
    this.validateSubmition();

    // Add roll score
    if (!this.playerError && !this.scoreError) {
      this.printLog();
      this.nextFrameError = '';
      this.addRollScore();
    }
  }

  // Move to the next frame button is clicked
  public nextFrame(): void {
    this.clearErrors();
    this.validateFrameCondition();

    // Continue to the next frame
    if (!this.nextFrameError) {
      if (this.frameNumber < 10) {
        // Reset frame rolls count
        for (const player of Object.keys(this.playerFrameRolls)) {
          this.playerFrameRolls[player] = [];
        }
        ++this.frameNumber;
        this.playerScore = '';
        this.formLog = '';
      } else {
        // Game is over - parent component should hide the form
        this.isGameOver.emit(true);
      }
    }
  }

  // Reset game score from parent
  public resetGameScores() {
    document.location.reload();
  }

  // Maximum of 4 players on each game
  private registerNewPlayer() {
    if (this.frameNumber > 1) {
      this.playerError = 'Cannot assign new players after the first frame.';
    } else if (Object.keys(this.playerFrameRolls).length === 4) {
      this.playerError = 'Already registered 4 players.';
    } else {
      this.playerFrameRolls[this.playerName] = [];
    }
  }

  // Check if the player had a spare or a strike
  private isSpareOrStrike(arr: number[]): boolean {
    const rollsSum = arr.reduce((a, b) => a + b);
    if (rollsSum === 10) return true;
    return false;
  }

  // Send an http request to the server
  private async addRollScore(): Promise<void> {
    try {
      const response = await axios.get(`${this.addRollApiUrl}?name=${this.playerName}&roll=${this.playerScore}`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Check that each player has two rolls 
  private validateFrameCondition(): void {
    // None players added
    if (Object.keys(this.playerFrameRolls).length === 0) {
      this.nextFrameError = 'Missing player score rolls.';
    } else {
      // Check that every player has two rolls or three after bonus on the last frame
      for (let player of Object.keys(this.playerFrameRolls)) {
        if (this.playerFrameRolls[player].length < 2 || (this.frameNumber === 10 && this.isSpareOrStrike(this.playerFrameRolls[player]))) {
          this.nextFrameError += `"${player}" is missing a roll score.`;
          break;
        }
      }
    }
  }

  // Validate submition
  private validateSubmition(): void {
    if (!this.playerFrameRolls[this.playerName]) {
      this.registerNewPlayer();
    }

    if (this.playerFrameRolls[this.playerName].length === 0) {
      this.playerFrameRolls[this.playerName].push(+this.playerScore);

      // On a strike, there won't be 2nd  roll on the current frame, therefore the next roll will be 0
      if (+this.playerScore === 10) {
        this.playerFrameRolls[this.playerName].push(0);
      }
    } else if (this.playerFrameRolls[this.playerName].length === 1) {
      // Validate that the second score is not greater than 10
      if (this.playerFrameRolls[this.playerName][0] + +this.playerScore <= 10) {
        this.playerFrameRolls[this.playerName].push(+this.playerScore);
      } else {
        this.scoreError = `Score of both rolls cannot be greater than 10, previous roll was ${this.playerFrameRolls[this.playerName][0]}`;
      }
    } else if (this.frameNumber === 10 && this.isSpareOrStrike(this.playerFrameRolls[this.playerName])) {
      this.playerFrameRolls[this.playerName].push(+this.playerScore);
    } else {
      this.playerError = `Already registered 2 rolls of this player.`;
    }
  }

  private clearErrors() {
    this.playerError = '';
    this.scoreError = '';
    this.nextFrameError = '';
  }

  private printLog() {
    if (+this.playerScore === 10) {
      this.formLog = `"${this.playerName}" rolled a strike! the next roll will be automatically 0.`;
    } else {
      this.formLog = `"${this.playerName}" rolled a score of ${this.playerScore}.`;
    }
  }
}
