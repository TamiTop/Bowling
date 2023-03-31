import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'

import { AppComponent } from './app.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { PlayersComponent } from './players/players.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    FormComponent,
    HeaderComponent,
    PlayersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatTableModule //needed?
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
