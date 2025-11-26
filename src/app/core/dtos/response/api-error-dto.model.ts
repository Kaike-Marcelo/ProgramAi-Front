export interface ResponseErrorJsonDto {
    errors: string[];
    tokenIsExpired?: boolean;
}