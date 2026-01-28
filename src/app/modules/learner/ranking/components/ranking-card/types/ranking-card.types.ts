export type RankingCardType = 'purple' | 'gray';

export interface StyleRankingCardInterface {
    background: string;
    position: string;
    text?: string;
    fullName?: string;
    codename?: string
    rankNameAndScore: string;
    stars: StarsInterface;
}

export interface StarsInterface {
    colorActivated: string;
    colorDisabled: string;
    fill?: boolean;
}