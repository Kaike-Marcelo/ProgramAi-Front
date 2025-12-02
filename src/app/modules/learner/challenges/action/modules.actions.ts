import { inject, Injectable } from "@angular/core";
import { ModulesService } from "../../../../services/modules.service";
import { SnackbarService } from "../../../../shared/services/snackbar.service";
import { ModulesStore } from "../store/modules.store";
import { forkJoin } from "rxjs";
import { RequestModule } from "../../../../core/dtos/request/request-module.model";

@Injectable({ providedIn: 'root' })
export class ModulesActions {
    #modulesService = inject(ModulesService);
    #snackbarService = inject(SnackbarService);
    #store = inject(ModulesStore);

    loadAll() {
        this.#store.setLoading(true);
        forkJoin({
            modules: this.#modulesService.getModules(),
            userModules: this.#modulesService.getModulesForLoggedInUser(),
        }).subscribe({
            next: (response) => {
                this.#store.setModules(response.modules.data);
                this.#store.setUserModules(response.userModules.data);
                this.#store.setLoading(false);

                this.#snackbarService.showSuccess(response.modules.message);
            },
            error: (err) => {
                this.#snackbarService.showError(err.message);
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
            }, error: (err) => {
                this.#snackbarService.showError(err.message);
                this.#store.setLoading(false);
            }
        })
    }
}