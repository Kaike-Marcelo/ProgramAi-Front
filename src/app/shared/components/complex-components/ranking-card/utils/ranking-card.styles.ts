import { RankingCardType, StyleRankingCardInterface } from "../types/ranking-card.types";

export function getRankingCardStyle(type: RankingCardType): StyleRankingCardInterface {
  return RANKING_CARD_STYLES[type];
}

export const RANKING_CARD_STYLES: Record<RankingCardType, StyleRankingCardInterface> = {
  purple: {
    background: 'bg-primary',
    position: 'text-secondary',
    text: 'text-base-100',
    fullName: 'text-base-100',
    codename: 'text-base-100/80',
    rankNameAndScore: 'text-secondary',
    stars: {
      colorActivated: 'text-yellow-400',
      colorDisabled: 'text-accent',
      fill: true,
    },
  },
  gray: {
    background: 'bg-base-200',
    position: 'text-primary',
    text: 'text-neutral-400',
    fullName: 'text-neutral-500',
    codename: 'text-neutral-500/80',
    rankNameAndScore: 'text-primary',
    stars: {
      colorActivated: 'text-yellow-400',
      colorDisabled: 'text-neutral-200',
      fill: true,
    }
  }
}