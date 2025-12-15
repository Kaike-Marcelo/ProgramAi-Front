import { ModuleDetails } from "../../../../core/models/challengs.model";

export interface ChallengesState {
    moduleDetails: ModuleDetails | null;
    loading: boolean;
    hasError: boolean;
}

export const initialChallengesState: ChallengesState = {
    moduleDetails: null,
    loading: false,
    hasError: false,
}