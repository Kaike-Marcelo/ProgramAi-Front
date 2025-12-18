import { inject, Injectable } from "@angular/core";
import { ChallengeService } from "../../../../services/challenge.service";
import { ChallengesStore } from "../store/challengs.store";
import { SnackbarService } from "../../../../shared/services/snackbar.service";
import { RequestChallengeQuestions, RequestModuleDetails, RequestQuestionDetailed, RequestSubmitQuestion } from "../../../../core/dtos/request/request-challenges.model";

@Injectable({ providedIn: 'root' })
export class ChallengesActions {
    #challengesService = inject(ChallengeService);
    #store = inject(ChallengesStore);
    #snackbarService = inject(SnackbarService);

    loadModuleDetails(module: RequestModuleDetails) {
        this.#store.setLoading(true);
        this.#challengesService.getModuleDetails(module).subscribe({
            next: (response) => {
                this.#store.setModuleDetails(response.data);
                this.#store.setLoading(false);
                this.#snackbarService.showSuccess(response.message);
            },
            error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
                this.#store.setError(true);
            }
        })
    }

    loadChallengeQuestions(request: RequestChallengeQuestions) {
        this.#store.setLoading(true);
        this.#challengesService.loadChallengeQuestions(request).subscribe({
            next: (response) => {
                this.#store.setModuleDetails(response.data);
                this.#store.setLoading(false);
                this.#snackbarService.showSuccess(response.message);
            },
            error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
                this.#store.setLoading(false);
                // this.#store.setError(true);
            }
        })
    }

    loadQuestionDetailed(request: RequestQuestionDetailed) {
        this.#store.setLoading(true);
        this.#challengesService.getQuestionDetailed(request).subscribe({
            next: (response) => {
                this.#store.setCurrentQuestion(response.data);
                this.#store.setLoading(false);
                this.#snackbarService.showSuccess(response.message);
            },
            error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
                this.#store.setLoading(false);
            }
        })
    }

    submitQuestionAnswer(request: RequestSubmitQuestion) {
        this.#store.setLoading(true);
        this.#challengesService.submitQuestionAnswer(request).subscribe({
            next: (response) => {
                this.#store.setCurrentQuestion(response.data);
                this.#store.setLoading(false);
                this.#snackbarService.showSuccess(response.message);
            },
            error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
                this.#store.setLoading(false);
            }
        })
    }

    clearState() {
        this.#store.clearState();
    }
}