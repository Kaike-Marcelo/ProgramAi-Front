import { Component, inject, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/simple-components/modal/modal.component';
import { FormBuilder } from '@angular/forms';
import { FormValidationService } from '../../../../../shared/services/form/form-validation.service';
import { ModuleFormsFactory } from '../../helpers/module-forms.factory';
import { Module } from '../../../../../core/models/module.model';
import { ModulesService } from '../../../../../services/modules.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { SnackbarService } from '../../../../../shared/services/snackbar.service';
import { MODULES_IMPORTS } from '../../helpers/imports';
import { INPUT_STYLES } from '../../../../../shared/styles/input-styles';
import { InputComponent } from '../../../../../shared/components/simple-components/input/input';

@Component({
  selector: 'app-register-modules',
  imports: [MODULES_IMPORTS],
  templateUrl: './register-modules.html',
})
export class RegisterModules {
  private destroy$ = new Subject<void>();

  #fb = inject(FormBuilder);
  #formValidationService = inject(FormValidationService);
  #modulesService = inject(ModulesService);
  #snackbarService = inject(SnackbarService);

  createModuleForm = ModuleFormsFactory.buildCreateModuleForm(this.#fb);
  r_loading = signal(false);

  inputGoldenStyle = INPUT_STYLES['golden'];

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

  createModule(): void {
    if (!this.#formValidationService.validateFormAndShowErrors(this.createModuleForm, this.appInputs)) return;

    const newModuleData: Module = this.createModuleForm.value;

    this.r_loading.set(true);
    this.#modulesService.createModule(newModuleData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.r_loading.set(false))
      ).subscribe({
        next: (response) => {
          // this.loadModules();
          this.#snackbarService.showSuccess(response.message);
          this.createModuleForm.reset();
          this.modalCreateModule.close();
        },
        error: (err) => {
          this.#snackbarService.showError(err.message);
        }
      });
  }

  openRegisterModulesModal() {
    setTimeout(() => this.modalCreateModule.open());
  }

  closeModal() {
    this.createModuleForm.reset();
    this.modalCreateModule.close();
  }

  getErrorMessage(controlName: string): string {
    return this.#formValidationService.getErrorMessage(this.createModuleForm, controlName);
  }
}
