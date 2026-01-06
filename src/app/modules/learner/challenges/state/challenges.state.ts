import { ChallengeQuestionDetails, ModuleDetails } from "../../../../core/models/challengs.model";

export interface ChallengesState {
    moduleDetails: ModuleDetails | null;
    currentQuestion: ChallengeQuestionDetails | null;
    progress: number;
    loading: boolean;
    hasError: boolean;
}

export const initialChallengesState: ChallengesState = {
    moduleDetails: null,
    currentQuestion: null,
    progress: 0,
    loading: false,
    hasError: false,
}