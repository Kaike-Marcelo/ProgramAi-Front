import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from "../shared/header/header";
import { ChallengesStore } from '../../store/challengs.store';
import { ChallengesActions } from '../../action/challenges.actions';

@Component({
  selector: 'app-challenge',
  imports: [Header],
  templateUrl: './challenge.html',
})
export class Challenge implements OnInit, OnDestroy {
  #store = inject(ChallengesStore);
  #actions = inject(ChallengesActions);

  #router = inject(Router);
  #route = inject(ActivatedRoute);

  currentQuestion = this.#store.currentQuestion;
  loading = this.#store.loading;
  questionId: number = 0;

  ngOnInit(): void {
    this.#route.params.subscribe(params => {
      this.questionId = params['questionId'];
      this.#actions.loadQuestionDetailed({ questionId: this.questionId });
    });
  }

  ngOnDestroy(): void {
    this.#actions.clearState();
  }

  goBack() {
    this.#router.navigate(['../..'], { relativeTo: this.#route });
  }
}
