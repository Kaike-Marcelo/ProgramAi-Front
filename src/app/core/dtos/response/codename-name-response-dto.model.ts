export interface CodenameNameResponseDto {
    id: number;
    name: string;
}

export interface CodenameNameListResponseDto {
    male: CodenameNameResponseDto[];
    female: CodenameNameResponseDto[];
    neutral: CodenameNameResponseDto[];
}