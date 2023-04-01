import { Component } from '@angular/core';
import axios from 'axios';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent {
    // Api URL
    private readonly getLeaderboardApiUrl = "/getLeaderboard";

    // Playing
    players: IPlayer[] = [{ name: 'Player 1', scores: [10, 22, 33, 44, 57, 61, 77, 88, 99, 120], rolls: [[1, 4], [5, 3], [6, 1], [3, 4], [5, 2], [2, 2], [8, 1], [6, 2], [7, 1], [4, 5]] },
    { name: 'Player 2', scores: [10, 22, 33, 44, 57, 61, 77, 88, 99, 120], rolls: [[4, 5], [6, 3], [1, 1], [9, 0], [8, 2], [6, 2], [7, 1], [5, 4], [9, 0], [6, 3]] },
    { name: 'Player 3', scores: [10, 22, 33, 44, 57, 61, 77, 88, 99, 120], rolls: [[3, 6], [4, 3], [7, 0], [8, 1], [5, 3], [2, 2], [9, 0], [5, 3], [7, 2], [5, 3]] },
    { name: 'Player 3', scores: [10, 22, 33, 44, 57, 61, 77, 88, 99, 120], rolls: [[3, 6], [4, 3], [7, 0], [8, 1], [5, 3], [2, 2], [9, 0], [5, 3], [7, 2], [6, 3, 2]] }
    ];

    //players: IPlayer[];

    // getter setter? instead of public
    public async getLeaderboard(): Promise<void> {
        try {
            // fix score to scores ffs
            const response = await axios.get(this.getLeaderboardApiUrl);
            if (response.data) {
                this.players = response.data;
                this.players.sort((a, b) => b.scores[b.scores.length - 1] - a.scores[a.scores.length - 1]);
                this.players.forEach((player, index) => {
                    player.place = index + 1;
                });
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}

interface IPlayer {
    place?: number,
    name: string,
    rolls: number[][],
    scores: number[]
}
