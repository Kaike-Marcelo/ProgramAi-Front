import { RequestProgress } from "./request-progress.model";
import { RequestToken } from "./request-token.model";

export interface RequestUser {
    firstName: string;
    lastName: string;
    email: string;
    codenameId: number;
    codenameName: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    progress: RequestProgress;
    tokens: RequestToken;
}