import { Component, Input } from '@angular/core';
import { Stars } from "../stars/stars";
import { Achievements } from '../../../../../core/models/achievements.model';
import { RankingCardType, StyleRankingCardInterface } from '../ranking-card/types/ranking-card.types';
import { getRankingCardStyle } from '../ranking-card/utils/ranking-card.styles';

@Component({
  selector: 'app-achievements-card',
  imports: [Stars],
  templateUrl: './achievements-card.html',
})
export class AchievementsCard {
  @Input() variant: RankingCardType = 'gray'
  @Input() data: Achievements | null = null;

  imgTrophy: string = 'images/trophy/img-1.svg';

  get styles(): StyleRankingCardInterface {
    return getRankingCardStyle(this.variant)!;
  }
}
