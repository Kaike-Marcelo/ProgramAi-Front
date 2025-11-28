import { Component, inject, OnInit, signal } from '@angular/core';
import { RankingCard } from "../../../shared/components/complex-components/ranking-card/ranking-card";
import { RankingService } from '../../../services/ranking.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { RankingGlobalModel } from '../../../core/models/ranking.model';

@Component({
  selector: 'app-ranking',
  imports: [RankingCard],
  templateUrl: './ranking.html',
})
export class Ranking implements OnInit {
  #rankingService = inject(RankingService);
  #snackbarService = inject(SnackbarService);

  r_loading = signal(false);
  data: RankingGlobalModel | null = null;

  ngOnInit(): void {
    this.r_loading.set(true);
    this.#rankingService.rankingGlobal()
      .pipe()
      .subscribe({
        next: (response) => {
          this.data = response.data;
          this.#snackbarService.showSuccess(response.message)
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
