import { ModuleSumary } from "../../../../core/models/challengs.model";

export interface DashboardState {
    moduleSumary: ModuleSumary | null;
    loading: boolean;
}

export const initialDashboardState: DashboardState = {
    moduleSumary: null,
    loading: false,
}