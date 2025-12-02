import { computed, Injectable, signal } from "@angular/core";
import { initialModulesState, ModulesState } from "../state/modules.state";
import { Module, ModuleForUser } from "../../../../core/models/module.model";

@Injectable({ providedIn: 'root' })
export class ModulesStore {
    private readonly ModulesState = signal<ModulesState>(initialModulesState);

    public readonly modules = computed(() => this.ModulesState().modules);
    public readonly userModules = computed(() => this.ModulesState().userModules);
    public readonly loading = computed(() => this.ModulesState().loading);

    public readonly idUserModule = computed(() => this.ModulesState().userModules.map(m => m.moduleId));

    setModules(modules: Module[]) {
        this.ModulesState.update(state => ({ ...state, modules }))
    }

    setUserModules(userModules: ModuleForUser[]) {
        this.ModulesState.update(state => ({ ...state, userModules }))
    }

    setLoading(loading: boolean) {
        this.ModulesState.update(state => ({ ...state, loading }))
    }

    get snapshot(): ModulesState {
        return this.ModulesState();
    }
}