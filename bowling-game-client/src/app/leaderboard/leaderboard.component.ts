import { Component } from '@angular/core';
import axios from 'axios';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent {
    private readonly getLeaderboardApiUrl = "/getLeaderboard";
    public leaderboard: ILeaderboard;

    // Get the leaderboard from the server
    public async getLeaderboard(): Promise<void> {
        try {
            const response = await axios.get(this.getLeaderboardApiUrl);
            if (response.data) {
                this.leaderboard = response.data;
                this.leaderboard.sort((a, b) => b.stats[b.stats.length - 1].score - 1 - a.stats[a.stats.length - 1].score - 1);
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}

// Leaderboard type and interfaces
type ILeaderboard = ILeaderboardItem[];

interface ILeaderboardItem {
    name: string,
    stats: IPlayerStats[]
}

interface IPlayerStats {
    rolls: number[],
    score: number
}