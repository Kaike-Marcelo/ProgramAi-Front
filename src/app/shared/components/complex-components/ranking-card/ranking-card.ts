import { Component, Input } from '@angular/core';
import { RankingCardType, StyleRankingCardInterface } from './types/ranking-card.types';
import { getRankingCardStyle } from './utils/ranking-card.styles';
import { RankingItemModel } from '../../../../core/models/ranking.model';

@Component({
  selector: 'app-ranking-card',
  imports: [],
  templateUrl: './ranking-card.html',
})
export class RankingCard {
  @Input() variant: RankingCardType = 'gray';
  @Input() data: RankingItemModel | null = null;

  totalNumberOfStars: number = 5;

  get styles(): StyleRankingCardInterface {
    return getRankingCardStyle(this.variant)!;
  }

  getStarsArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
}
