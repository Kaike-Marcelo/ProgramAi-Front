import { Component, inject, OnInit, signal } from '@angular/core';
import { RankingCard } from "../../../shared/components/complex-components/ranking-card/ranking-card";
import { RankingService } from '../../../services/ranking.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { RankingGlobalModel } from '../../../core/models/ranking.model';
import { AchievementsCard } from "./components/achievements-card/achievements-card";
import { Achievements } from '../../../core/models/achievements.model';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-ranking',
  imports: [RankingCard, AchievementsCard],
  templateUrl: './ranking.html',
})
export class Ranking implements OnInit {
  #rankingService = inject(RankingService);
  #userService = inject(UserService);
  #snackbarService = inject(SnackbarService);

  r_loading = signal(false);
  data: RankingGlobalModel | null = null;
  achievementsData: Achievements | null = null;

  ngOnInit(): void {
    this.r_loading.set(true);
    forkJoin({
      ranking: this.#rankingService.rankingGlobal(),
      achievements: this.#userService.getAchievements()
    }).subscribe({
      next: (response) => {
        this.data = response.ranking.data;
        this.achievementsData = response.achievements.data;
        this.#snackbarService.showSuccess(response.ranking.message)
      },
      error: (err) => {
        this.#snackbarService.showError(err.message);
        this.r_loading.set(false);
      },
      complete: () => {
        this.r_loading.set(false);
      }
    })
  }
}
