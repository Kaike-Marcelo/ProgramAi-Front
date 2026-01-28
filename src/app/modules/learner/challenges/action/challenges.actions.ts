import { inject, Injectable } from "@angular/core";
import { ChallengeService } from "../../../../services/challenge.service";
import { ChallengesStore } from "../store/challengs.store";
import { SnackbarService } from "../../../../shared/services/snackbar.service";
import { RequestChallengeQuestions, RequestModuleDetails, RequestQuestionDetailed, RequestSubmitQuestion, RequestTrainingProgress } from "../../../../core/dtos/request/request-challenges.model";
import { finalize, tap } from "rxjs";
import { AuthenticationService } from "../../../../services/authentication.service";

@Injectable({ providedIn: 'root' })
export class ChallengesActions {
    #challengesService = inject(ChallengeService);
    #authenticationService = inject(AuthenticationService);
    #store = inject(ChallengesStore);
    #snackbarService = inject(SnackbarService);

    loadModuleDetails(module: RequestModuleDetails) {
        this.#store.setLoading(true);
        this.#challengesService.getModuleDetails(module).subscribe({
            next: (response) => {
                this.#store.setModuleDetails(response.data);
                this.#store.setLoading(false);
            },
            error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
                this.#store.setError(true);
            }
        })
    }

    loadChallengeQuestions(request: RequestChallengeQuestions) {
        this.#store.setLoading(true);
        return this.#challengesService.loadChallengeQuestions(request)
            .pipe(
                finalize(() => { this.#store.setLoading(false); }),
                tap({
                    next: (response) => {
                        const currentModuleDetails = this.#store.snapshot.moduleDetails;

                        if (currentModuleDetails && response.data?.topics?.length > 0) {
                            const updatedTopics = currentModuleDetails.topics.map(topic => {
                                if (topic.topicId === request.topicId) {
                                    return {
                                        ...topic,
                                        ...response.data.topics[0],
                                    };
                                }
                                return topic;
                            });

                            this.#store.setModuleDetails({
                                ...currentModuleDetails,
                                topics: updatedTopics
                            });
                        }
                        this.#store.setLoading(false);
                    },
                    error: (err: string[]) => {
                        this.#snackbarService.showError(err[0]);
                        this.#store.setLoading(false);
                    }
                })
            );
    }

    loadQuestionDetailed(request: RequestQuestionDetailed) {
        this.#store.setLoading(true);
        this.#challengesService.getQuestionDetailed(request).subscribe({
            next: (response) => {
                this.#store.setCurrentQuestion(response.data);
                this.#store.setLoading(false);
            },
            error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
                this.#store.setLoading(false);
            }
        })
    }

    loadTrainingProgress(request: RequestTrainingProgress) {
        this.#store.setLoading(true);
        this.#challengesService.getTrainingProgress(request).subscribe({
            next: (response) => {
                this.#store.setProgress(response.data.completedPercentage);
            },
            error: (err: string[]) => {
                this.#snackbarService.showError(err[0]);
            }, complete: () => {
                this.#store.setLoading(false);
            }
        });
    }

    submitQuestionAnswer(request: RequestSubmitQuestion) {
        this.#store.setLoading(true);
        return this.#challengesService.submitQuestionAnswer(request)
            .pipe(
                finalize(() => { this.#store.setLoading(false); }),
                tap({
                    next: (response) => {
                        this.#store.setCurrentQuestion(response.data);

                        const user = this.#authenticationService.getLoggedInUser();
                        if (user) {
                            user.progress.totalScore += response.data.attempt.aiScore;
                            this.#authenticationService.updateUserLocalStorage(user);
                        }
                    },
                    error: (err: string[]) => {
                        this.#snackbarService.showError(err[0]);
                    }
                }));
    }

    getHint(request: RequestQuestionDetailed) {
        return this.#challengesService.getHintQuestion(request).pipe(
            tap({
                next: (response) => {
                    const currentQuestion = this.#store.snapshot.currentQuestion;
                    if (currentQuestion) {
                        const updatedQuestion = {
                            ...currentQuestion, attempt: {
                                ...currentQuestion.attempt,
                                aiHint: response.data.hint
                            }
                        };
                        this.#store.setCurrentQuestion(updatedQuestion);
                    }
                },
                error: (err: string[]) => {
                    this.#snackbarService.showError(err[0]);
                },
            })
        );
    }

    clearState() {
        this.#store.clearState();
    }
}