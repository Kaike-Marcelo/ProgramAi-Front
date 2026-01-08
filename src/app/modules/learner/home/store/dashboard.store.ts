import { computed, Injectable, signal } from "@angular/core";
import { DashboardState, initialDashboardState } from "../state/dashboard.state";
import { ModuleSumary } from "../../../../core/models/challengs.model";

@Injectable({ providedIn: 'root' })
export class DashboardStore {
    private readonly DashboardState = signal<DashboardState>(initialDashboardState);

    public readonly moduleSumary = computed(() => this.DashboardState().moduleSumary);
    public readonly loading = computed(() => this.DashboardState().loading);

    setModuleSumary(moduleSumary: ModuleSumary) {
        this.DashboardState.update(state => ({ ...state, moduleSumary }))
    }

    setLoading(loading: boolean) {
        this.DashboardState.update(state => ({ ...state, loading }))
    }

    clearState() {
        this.DashboardState.set(initialDashboardState);
    }

    get snapshot(): DashboardState {
        return this.DashboardState();
    }
}