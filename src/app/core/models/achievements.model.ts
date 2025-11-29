export interface Achievements {
    codenameName: string;
    rankName: string;
    rankTier: number;
    stars: number;
    challengesCompleted: number;
    challengesFailed: number;
    totalScore: number;
    accomplishments: Accomplishment[];
}

export interface Accomplishment {
    name: string;
    description: string;
    achievedAt: string;
}