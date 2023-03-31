import { Component } from '@angular/core'

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent {
    leaderboard: leaderboardItem[] = [{ name: "tami", score: 1 }, { name: "tralal", score: 1 }];

    private getUpdatedLeaderboard() {

    }
}

interface leaderboardItem {
    name: string;
    score: number;
}