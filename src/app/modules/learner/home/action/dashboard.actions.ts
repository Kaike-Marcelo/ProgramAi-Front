import { inject, Injectable } from "@angular/core";
import { DashboardService } from "../../../../services/dashboard.service";
import { DashboardStore } from "../store/dashboard.store";
import { SnackbarService } from "../../../../shared/services/snackbar.service";
import { RequestTrainingProgress } from "../../../../core/dtos/request/request-challenges.model";

@Injectable({ providedIn: 'root' })
export class DashboardActions {
    #dashboardService = inject(DashboardService);
    #store = inject(DashboardStore);
    #snackbarService = inject(SnackbarService);

    loadModuleSumary(request: RequestTrainingProgress) {
        this.#store.setLoading(true);
        this.#dashboardService.getDashboardModuleSumary(request).subscribe({
            next: (response) => {
                this.#store.setModuleSumary(response.data);
                this.#snackbarService.showSuccess(response.message);
            }, error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
                this.#store.setLoading(false);
            }, complete: () => {
                this.#store.setLoading(false);
            }
        })
    }
}