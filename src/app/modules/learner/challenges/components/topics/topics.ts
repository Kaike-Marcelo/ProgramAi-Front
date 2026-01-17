import { Component, inject, OnDestroy, OnInit, effect, computed } from '@angular/core';
import { Accordion } from "./components/accordion/accordion";
import { ChallengesStore } from '../../store/challengs.store';
import { ChallengesActions } from '../../action/challenges.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestChallengeQuestions, RequestModuleDetails, RequestTrainingProgress } from '../../../../../core/dtos/request/request-challenges.model';
import { Header } from "../shared/header/header";
import { LanguageService } from '../../../../../shared/services/code-execution/language.service';

@Component({
  selector: 'app-topics',
  imports: [Accordion, Header],
  templateUrl: './topics.html',
})
export class Topics implements OnInit, OnDestroy {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #store = inject(ChallengesStore);
  #actions = inject(ChallengesActions);
  #languageService = inject(LanguageService);

  moduleId: string = '';
  moduleDetails = this.#store.moduleDatails;
  loading = this.#store.loading;
  hasError = this.#store.hasError;

  progress = this.#store.progress;

  constructor() {
    effect(() => {
      if (this.hasError()) {
        this.#router.navigate(['learner/modules']);
      }
    });
  }

  ngOnInit(): void {
    this.#route.params.subscribe(params => {
      this.moduleId = params['moduleId'];
      const request: RequestModuleDetails = {
        moduleId: this.moduleId,
        includeEmptyTopics: true
      }
      this.#actions.loadModuleDetails(request);
      this.#actions.loadTrainingProgress(this.getRequestProgress());
    })
  }

  ngOnDestroy(): void {
    this.#actions.clearState();
  }

  goBack() {
    this.#router.navigate(['learner/modules']);
  }

  onTopicClick(id: number) {
    if (!id) return;
    const request: RequestChallengeQuestions = {
      moduleId: Number(this.moduleId),
      topicId: id,
    }
    this.#actions.loadChallengeQuestions(request).subscribe(
      {
        next: () => {
          this.#actions.loadTrainingProgress(this.getRequestProgress());
        }
      }
    );
  }

  onQuestionClick(questionId: number) {
    const moduleName = this.moduleDetails()?.moduleName;
    this.#router.navigate([`learner/modules/${this.moduleId}/challenge/${questionId}`],
      {
        queryParams: { moduleName }
      }
    );
  }

  getIconFromLanguage(name: string): string {
    return this.#languageService.convertLanguageNameToIcon(name.toLowerCase().split(' ').join(''));
  }

  getRequestProgress(): RequestTrainingProgress {
    return {
      moduleId: Number(this.moduleId),
      maxQuestions: 0,
      randomQuestions: false
    }
  }

  get subtitleHtml() {
    return `<span class='text-secondary'>#</span>
            <span class='text-accent font-bold'>
              AcerteDePrima
            </span> para ganhar bônus extra.`;
  }
}
