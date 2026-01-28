import { AccomplishmentsResponseDto } from "./accomplishments.response-dto.model";

export interface AchievementsResponseDto {
    codenameName: string;
    rankName: string;
    rankTier: number;
    stars: number;
    challengesCompleted: number;
    challengesFailed: number;
    totalScore: number;
    accomplishments: AccomplishmentsResponseDto[];
}