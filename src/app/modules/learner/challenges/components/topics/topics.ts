import { Component, inject, OnDestroy, OnInit, effect, computed } from '@angular/core';
import { Accordion } from "./components/accordion/accordion";
import { ChallengesStore } from '../../store/challengs.store';
import { ChallengesActions } from '../../action/challenges.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestChallengeQuestions, RequestModuleDetails } from '../../../../../core/dtos/request/request-challenges.model';
import { Header } from "../shared/header/header";

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

  moduleId: string = '';
  moduleDetails = this.#store.moduleDatails;
  loading = this.#store.loading;
  hasError = this.#store.hasError;

  progress = computed(() => {
    const details = this.moduleDetails();
    if (!details || !details.topics || details.topics.length === 0) return 0;

    let totalWeightedScore = 0;
    let maxPossibleScore = 0;

    for (const topic of details.topics) {
      const topicWeight = 1;

      if (topic.questions && topic.questions.length > 0) {
        const totalQuestions = topic.questions.length;
        const completedQuestions = topic.questions.filter(q => q.endAt && q.endAt !== '').length;

        const maxScoreForTopic = totalQuestions;
        const playerScoreForTopic = completedQuestions;

        const weightedContribution = (playerScoreForTopic / maxScoreForTopic) * topicWeight;
        totalWeightedScore += weightedContribution;
        maxPossibleScore += topicWeight;

      } else {
        const maxScoreForTopic = 10;
        const playerScoreForTopic = 0;

        const weightedContribution = (playerScoreForTopic / maxScoreForTopic) * topicWeight;
        totalWeightedScore += weightedContribution;
        maxPossibleScore += topicWeight;
      }
    }
    const calculatedProgress = maxPossibleScore > 0 ? (totalWeightedScore / maxPossibleScore) * 100 : 0;

    return Math.round(calculatedProgress);
  });

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
      this.#actions.loadModuleDetails(request)
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
    this.#actions.loadChallengeQuestions(request);
  }

  onQuestionClick(questionId: number) {
    const moduleName = this.moduleDetails()?.moduleName;
    this.#router.navigate([`learner/modules/${this.moduleId}/challenge/${questionId}`],
      {
        queryParams: { moduleName }
      }
    );
  }

  getLowercaseName(name: string): string {
    return name.toLowerCase().split(' ').join('');
  }

  get subtitleHtml() {
    return `<span class='text-secondary'>#</span>
            <span class='text-accent font-bold'>
              AcerteDePrima
            </span> para ganhar bônus extra.`;
  }
}
