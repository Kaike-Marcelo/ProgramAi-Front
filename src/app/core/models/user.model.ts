import { EUserRole } from "../enums/user-role.enum";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: EUserRole;
    codenameId: number;
    codenameName: string;
    createdAt: string;
    updatedAt: string;
    progress: Progress;
    tokens: Token;
}

export interface Progress {
    codenameName: string;
    rankName: string;
    rankTier: number;
    stars: number;
    challengesCompleted: number;
    challengesFailed: number;
    totalScore: number;
    accomplishments: any[];
}

export interface Token {
    accessToken: string;
}