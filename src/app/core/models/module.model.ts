export interface Module {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface ModuleForUser {
    id: string;
    moduleId: string;
    moduleName: string;
    createdAt: string;
}