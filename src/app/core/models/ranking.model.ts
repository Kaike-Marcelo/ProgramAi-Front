export interface RankingGlobalModel {
    individualRanking: RankingItemModel,
    globalRanking: RankingItemModel[]
}

export interface RankingItemModel {
    position: number,
    fullName: string,
    codenameName: string,
    stars: number,
    rankName: string,
    totalScore: number
}