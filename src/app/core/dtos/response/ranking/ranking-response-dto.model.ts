import { RankingItemDtoModel } from "./ranking-item-dto.model"

export interface RankingResponseDtoModel {
    individualRanking: RankingItemDtoModel,
    globalRanking: RankingItemDtoModel[]
}