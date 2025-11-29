import { EUserRole } from "../../enums/user-role.enum";
import { ProgressResponseDto } from "./progress-response-dto.model";
import { TokenResponseDto } from "./token-response-dto.model";

export interface SignInResponseDto {
    firstName: string;
    lastName: string;
    email: string;
    codenameId: number;
    codenameName: string;
    createdAt: string;
    updatedAt: string;
    role: EUserRole;
    progress: ProgressResponseDto;
    tokens: TokenResponseDto;
}