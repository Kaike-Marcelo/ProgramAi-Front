export interface GlotRunResponseDto {
    stdout: string;
    stderr: string;
    error: string;
    files?: Array<{
        name: string;
        content: string;
    }>;
}