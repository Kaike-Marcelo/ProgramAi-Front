import { ChallengeQuestionDetails, ModuleDetails } from "../../../../core/models/challengs.model";

export interface ChallengesState {
    moduleDetails: ModuleDetails | null;
    currentQuestion: ChallengeQuestionDetails | null;
    loading: boolean;
    hasError: boolean;
}

export const initialChallengesState: ChallengesState = {
    moduleDetails: null,
    currentQuestion: null,
    loading: false,
    hasError: false,
}