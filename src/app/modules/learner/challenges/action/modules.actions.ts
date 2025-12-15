import { inject, Injectable } from "@angular/core";
import { ModulesService } from "../../../../services/modules.service";
import { SnackbarService } from "../../../../shared/services/snackbar.service";
import { ModulesStore } from "../store/modules.store";
import { RequestModule, RequestUserModule } from "../../../../core/dtos/request/request-module.model";

@Injectable({ providedIn: 'root' })
export class ModulesActions {
    #modulesService = inject(ModulesService);
    #snackbarService = inject(SnackbarService);
    #store = inject(ModulesStore);

    loadAllModules() {
        this.#store.setLoading(true);
        this.#modulesService.getModules().subscribe({
            next: (response) => {
                this.#store.setModules(response.data);
                this.#store.setLoading(false);
                this.#snackbarService.showSuccess(response.message);
            }, error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
                this.#store.setLoading(false);
            }
        })
    }

    loadAllUserModules() {
        this.#store.setLoading(true);
        this.#modulesService.getModulesForLoggedInUser().subscribe({
            next: (response) => {
                this.#store.setUserModules(response.data);
                this.#store.setLoading(false);
                // this.#snackbarService.showSuccess(response.message);
            }, error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
                this.#store.setLoading(false);
            }
        })
    }

    create(module: RequestModule) {
        this.#store.setLoading(true);
        this.#modulesService.createModule(module).subscribe({
            next: (response) => {
                const currentModules = this.#store.snapshot.modules;
                this.#store.setModules([...currentModules, response.data]);
                this.#store.setLoading(false);
                this.#snackbarService.showSuccess(response.message);
            }, error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
                this.#store.setLoading(false);
            }
        })
    }

    addNewModuleToUser(module: RequestUserModule) {
        this.#store.setLoading(true);
        this.#modulesService.addNewModuleToUser(module).subscribe({
            next: (response) => {
                const currentModules = this.#store.snapshot.userModules;
                this.#store.setUserModules([...currentModules, response.data]);
                this.#store.setLoading(false);
                this.#snackbarService.showSuccess(response.message);
            }, error: (err: string[]) => {
                this.#snackbarService.showError(err[0] || 'Erro ao adicionar módulo ao usuário.');
                this.#store.setLoading(false);
            }
        })
    }
}