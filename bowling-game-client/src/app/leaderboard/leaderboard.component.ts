import { Component } from '@angular/core';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent {
    // temporaty
    players: IPlayer[] = [{ name: 'Player 1', score: 200, rolls: [[1, 4], [5, 3], [6, 1], [3, 4], [5, 2], [2, 2], [8, 1], [6, 2], [7, 1], [4, 5, 3]] },
    { name: 'Player 2', score: 180, rolls: [[4, 5], [6, 3], [1, 1], [9, 0], [8, 2], [6, 2], [7, 1], [5, 4], [9, 0], [6, 3, 2]] },
    { name: 'Player 3', score: 210, rolls: [[3, 6], [4, 3], [7, 0], [8, 1], [5, 3], [2, 2], [9, 0], [5, 3], [7, 2], [5, 3, 2]] },
    ];

    ngOnInit() {
        // Sort players array in descending order by score and calculate rank of each player based on their score
        this.players.sort((a, b) => b.score - a.score);
        this.players.forEach((player, index) => {
            player.place = index + 1;
        });
    }
}

interface IPlayer {
    place?: number,
    name: string,
    rolls: number[][],
    score: number
}
