export interface ProgressResponseDto {
    codenameName: string;
    rankName: string;
    rankTier: number;
    stars: number;
    challengesCompleted: number;
    challengesFailed: number;
    totalScore: number;
    accomplishments: any[];
}