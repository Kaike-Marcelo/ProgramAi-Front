import { computed, Injectable, signal } from "@angular/core";
import { ChallengesState, initialChallengesState } from "../state/challenges.state";
import { ChallengeQuestionDetails, ModuleDetails } from "../../../../core/models/challengs.model";

@Injectable({ providedIn: 'root' })
export class ChallengesStore {
    private readonly challengesState = signal<ChallengesState>(initialChallengesState);

    public readonly moduleDatails = computed(() => this.challengesState().moduleDetails);
    public readonly currentQuestion = computed(() => this.challengesState().currentQuestion);
    public readonly loading = computed(() => this.challengesState().loading);
    public readonly hasError = computed(() => this.challengesState().hasError);

    setModuleDetails(moduleDetails: ModuleDetails) {
        this.challengesState.update(state => ({ ...state, moduleDetails, hasError: false }))
    }

    setCurrentQuestion(questionDetailed: ChallengeQuestionDetails) {
        this.challengesState.update(state => ({ ...state, currentQuestion: questionDetailed }))
    }

    setLoading(loading: boolean) {
        this.challengesState.update(state => ({ ...state, loading }))
    }

    setError(hasError: boolean) {
        this.challengesState.update(state => ({ ...state, hasError, loading: false }))
    }

    clearState() {
        this.challengesState.set(initialChallengesState);
    }

    get snapshot(): ChallengesState {
        return this.challengesState();
    }
}