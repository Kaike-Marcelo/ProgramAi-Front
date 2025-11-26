export interface SignInResponseDto {
    firstName: string;
    lastName: string;
    email: string;
    codenameId: number;
    codenameName: string;
    createdAt: string;
    updatedAt: string;
    progress: {
        codenameName: string;
        rankName: string;
        rankTier: number;
        stars: number;
        challengesCompleted: number;
        challengesFailed: number;
        totalScore: number;
        accomplishments: any[];
    },
    tokens: {
        accessToken: string;
    }
}