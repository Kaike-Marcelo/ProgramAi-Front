import { Module, ModuleForUser } from "../../../../core/models/module.model";

export interface ModulesState {
    modules: Module[];
    userModules: ModuleForUser[];
    loading: boolean;
}

export const initialModulesState: ModulesState = {
    modules: [],
    userModules: [],
    loading: false,
};