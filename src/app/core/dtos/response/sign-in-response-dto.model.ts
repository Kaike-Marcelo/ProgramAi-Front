export interface SignInResponseDto {
    tokens: {
        accessToken: string;
    },
    email: string,
    firstName: string,
    lastName: string,
}