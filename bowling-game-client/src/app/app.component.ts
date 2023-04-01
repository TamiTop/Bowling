import { Component, ViewChild } from '@angular/core';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild(LeaderboardComponent) leaderboardComponent: LeaderboardComponent;

  isGameOver = false;

  onGameOver(event: boolean) {
    this.isGameOver = true;
    this.leaderboardComponent.getLeaderboard();
  }
}
