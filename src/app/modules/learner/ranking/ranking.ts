import { Component, inject, OnInit, signal } from '@angular/core';
import { RankingService } from '../../../services/ranking.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { RankingGlobalModel } from '../../../core/models/ranking.model';
import { AchievementsCard } from "./components/achievements-card/achievements-card";
import { Achievements } from '../../../core/models/achievements.model';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { RankingCard } from './components/ranking-card/ranking-card';
import { RankingCardSkeleton } from "../../../shared/components/complex-components/skeleton/ranking-card-skeleton/ranking-card-skeleton";

@Component({
  selector: 'app-ranking',
  imports: [RankingCard, AchievementsCard, RankingCardSkeleton],
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
      error: (err: string[]) => {
        this.#snackbarService.showError(err[0]);
        this.r_loading.set(false);
      },
      complete: () => {
        this.r_loading.set(false);
      }
    })
  }
}
