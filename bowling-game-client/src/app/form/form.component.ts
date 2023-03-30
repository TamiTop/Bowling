import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  playerScore = '';
  playerName = '';
  submitted = false;
  leaderboard = [];

  onSubmit() {
    // add http request to the server
    this.leaderboard.push(this.playerName);
    console.log(this.leaderboard)
  }
}
