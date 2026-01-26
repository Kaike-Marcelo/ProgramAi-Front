import { Component, effect, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengesStore } from '../../store/challengs.store';
import { ChallengesActions } from '../../action/challenges.actions';
import { CodeExecutionService } from '../../../../../shared/services/code-execution/code-execution.service';
import { LanguageService } from '../../../../../shared/services/code-execution/language.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from '../../../../../shared/services/snackbar.service';
import { ModalComponent } from '../../../../../shared/components/simple-components/modal/modal.component';
import { CHALLENGE_IMPORTS } from '../../helpers/imports';
import { CodeNormalizerService } from '../../../../../shared/services/code-execution/code-normalizer.service';

@Component({
  selector: 'app-challenge',
  imports: [CHALLENGE_IMPORTS],
  templateUrl: './challenge.html',
})
export class Challenge implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  #store = inject(ChallengesStore);
  #actions = inject(ChallengesActions);
  #executionService = inject(CodeExecutionService);
  #languageService = inject(LanguageService);
  #codeNormalizer = inject(CodeNormalizerService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  currentQuestion = this.#store.currentQuestion;
  loading = this.#store.loading;

  currentCode = signal<string>('');
  consoleMessages = this.#executionService.consoleMessages;
  isExecuting = this.#executionService.isExecuting;
  lastExecutionResult = this.#executionService.lastExecutionResult;

  modalTitle = signal<string>('');
  modalContent = signal<string>('');
  modalLoading = signal<boolean>(false);

  questionId: number = 0;
  language: string = '';

  #snackbarService = inject(SnackbarService);

  @ViewChild('contentModal') contentModal!: ModalComponent;

  constructor() {
    effect(() => {
      const savedCode = this.currentQuestion()?.attempt?.submittedCode;
      if (savedCode && !this.currentCode()) {
        const hasLineBreaks = savedCode.includes('\n');
        const finalCode = hasLineBreaks ? savedCode : this.#codeNormalizer.normalizeMinifiedCode(savedCode);
        this.currentCode.set(finalCode);
      }
    });
  }

  ngOnInit(): void {
    this.#route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.questionId = params['questionId'];
        this.#actions.loadQuestionDetailed({ questionId: this.questionId });
      });

    this.#route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(queryParams => {
        const moduleName = queryParams['moduleName'];
        if (moduleName) {
          this.language = this.#languageService.getLanguageName(moduleName.toLowerCase());
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.#actions.clearState();
  }

  goBack() {
    this.#router.navigate(['../..'], { relativeTo: this.#route });
  }

  onCodeChanged(code: string): void {
    this.currentCode.set(code);
  }

  executeCode(): void {
    this.#executionService.executeCode(this.language, this.currentCode());
  }

  clearConsole(): void {
    this.#executionService.clearConsole();
  }

  onHintClick(): void {
    const existingHint = this.currentQuestion()?.attempt?.aiHint;

    if (existingHint) {
      this.openModal('Super Dica', existingHint);
    } else {
      this.getHint();
    }
  }

  onFeedbackClick(): void {
    const feedback = this.currentQuestion()?.attempt?.aiFeedback;
    if (feedback) {
      this.openModal('Feedback', feedback);
    }
  }

  private openModal(title: string, content: string): void {
    this.modalTitle.set(title);
    this.modalContent.set(content);
    this.modalLoading.set(false);
    this.contentModal.open();
  }

  getHint(): void {
    if (!this.questionId) return;

    this.#executionService.clearLastExecution();

    if (!this.currentQuestion()?.attempt?.aiHint || !this.currentQuestion()?.endAt) {
      this.#actions.getHint({ questionId: this.questionId })
        .subscribe(() => {
          this.onHintClick();
        })
    }
  }

  submitCode() {
    const codeToSubmit = this.currentCode().trim();
    if (!this.questionId || !codeToSubmit) {
      this.#snackbarService.showError('Código não pode estar vazio.');
      return;
    }

    this.#executionService.clearLastExecution();

    if (this.currentQuestion()?.endAt) {
      this.#snackbarService.showError('Esta questão já está finalizada.');
      return;
    }

    this.#actions.submitQuestionAnswer({
      questionId: this.questionId,
      code: codeToSubmit
    });
  }
}
