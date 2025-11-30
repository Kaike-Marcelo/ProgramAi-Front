import { Component, inject, OnDestroy, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { ModulesCard } from "./components/modules-card/modules-card";
import { ModulesService } from '../../../services/modules.service';
import { Module, ModuleForUser } from '../../../core/models/module.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { EUserRole } from '../../../core/enums/user-role.enum';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { ChallengeService } from '../../../services/challenge.service';
import { CARD_STYLES } from '../../../shared/styles/card-styles';
import { ModalComponent } from '../../../shared/components/simple-components/modal/modal.component';
import { InputComponent } from "../../../shared/components/simple-components/input/input";
import { FormBuilder, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { ModuleFormsFactory } from './helpers/module-forms.factory';
import { INPUT_STYLES } from '../../../shared/styles/input-styles';
import { LabelComponent } from "../../../shared/components/simple-components/label/label";
import { FormValidationService } from '../../../shared/services/form/form-validation.service';
import { PrimaryButtonComponent } from "../../../shared/components/simple-components/button/primary-button/primary-button.component";

@Component({
  selector: 'app-challenges',
  imports: [ModulesCard, ModalComponent, InputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, LabelComponent, PrimaryButtonComponent],
  templateUrl: './challenges.html',
})
export class Challenges implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  #fb = inject(FormBuilder);

  #modulesService = inject(ModulesService);
  #challengeService = inject(ChallengeService);
  #authService = inject(AuthenticationService);
  #formValidationService = inject(FormValidationService);
  #snackbarService = inject(SnackbarService);

  r_loading = signal(false);
  modulesData: Module[] = [];
  userModulesData: ModuleForUser[] = [];

  inputGoldenStyle = INPUT_STYLES['golden'];
  styleCard = CARD_STYLES['golden'];
  styleCardFromUser = CARD_STYLES['royal'];

  createModuleForm = ModuleFormsFactory.buildCreateModuleForm(this.#fb);

  @ViewChild('modalCreateModule') modalCreateModule!: ModalComponent;
  @ViewChildren(InputComponent) appInputs!: QueryList<InputComponent>;

  modalActions = [
    {
      label: 'Cancelar',
      action: () => this.modalCreateModule.close()
    },
    {
      label: 'Salvar',
      action: () => this.createModule()
    }
  ];

  ngOnInit(): void {
    this.loadModules();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadModules(): void {
    this.r_loading.set(true);
    forkJoin({
      modules: this.#modulesService.getModules(),
      userModules: this.#challengeService.getModulesForLoggedInUser()
    }).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.modulesData = response.modules.data;
          this.userModulesData = response.userModules.data;
          this.#snackbarService.showSuccess(response.modules.message);
        },
        error: (err) => {
          this.#snackbarService.showError(err.message);
          this.r_loading.set(false);
        },
        complete: () => {
          this.r_loading.set(false);
        }
      });
  }

  createModule(): void {
    if (!this.#formValidationService.validateFormAndShowErrors(this.createModuleForm, this.appInputs)) return;

    const newModuleData: Module = this.createModuleForm.value;

    this.r_loading.set(true);
    this.#modulesService.createModule(newModuleData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.loadModules();
          this.#snackbarService.showSuccess(response.message);
          this.createModuleForm.reset();
          this.modalCreateModule.close();
        },
        error: (err) => {
          this.#snackbarService.showError(err.message);
          this.r_loading.set(false);
        },
        complete: () => {
          this.r_loading.set(false);
        }
      });
  }

  openModal() {
    this.modalCreateModule.open();
  }

  closeModal() {
    this.createModuleForm.reset();
    this.modalCreateModule.close();
  }

  get isAuthorized(): boolean {
    // Mudar posteriormente para retornar VERDADEIRO se for ADMIN
    return this.#authService.getLoggedInUser()?.role !== EUserRole.Learner;
  }

  isUserModule(moduleId: string): boolean {
    return this.userModulesData.some(um => um.moduleId === moduleId);
  }

  getErrorMessage(controlName: string): string {
    return this.#formValidationService.getErrorMessage(this.createModuleForm, controlName);
  }
}
