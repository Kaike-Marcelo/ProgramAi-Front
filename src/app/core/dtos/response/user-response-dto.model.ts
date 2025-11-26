import { ProgressResponseDto } from "./progress-response-dto.model";
import { TokenResponseDto } from "./token-response-dto.model";

export interface UserResponseDto {
    firstName: string;
    lastName: string;
    email: string;
    codenameId: number;
    codenameName: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    progress: ProgressResponseDto;
    tokens: TokenResponseDto;
}