export interface ModulesResponseDto {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface ModulesForTheLoggedInUserResponseDto {
    id: string;
    moduleId: string;
    moduleName: string;
    createdAt: string;
}