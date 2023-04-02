import { Component, ViewChild } from '@angular/core';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FormComponent } from './form/form.component';
import { AppService } from './app.service';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild(LeaderboardComponent) leaderboardComponent: LeaderboardComponent;
  @ViewChild(FormComponent) formComponent: FormComponent;

  constructor(
    private appService: AppService,
  ) {}

  private readonly restartGameApiUrl = `${this.appService.apiUrl}resetGame`;
  isGameOver = false;

  onGameOver(event: boolean) {
    this.isGameOver = true;
    this.leaderboardComponent.getLeaderboard();
  }

  public async resetGame() {
    this.formComponent.resetGameScores();

    try {
      const response = await axios.get(this.restartGameApiUrl, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
}
