import { EUserRole } from "../../enums/user-role.enum";
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
    role: EUserRole;
    progress: RequestProgress;
    tokens: RequestToken;
}

export interface RequestUpdateUser {
    firstName: string;
    lastName: string;
    codenameId: number;
}