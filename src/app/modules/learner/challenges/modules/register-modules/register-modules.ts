import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/simple-components/modal/modal.component';
import { FormBuilder } from '@angular/forms';
import { FormValidationService } from '../../../../../shared/services/form/form-validation.service';
import { ModuleFormsFactory } from '../../helpers/module-forms.factory';
import { Module } from '../../../../../core/models/module.model';
import { MODULES_IMPORTS } from '../../helpers/imports';
import { INPUT_STYLES } from '../../../../../shared/styles/input-styles';
import { InputComponent } from '../../../../../shared/components/simple-components/input/input';
import { ModulesActions } from '../../action/modules.actions';
import { ModulesStore } from '../../store/modules.store';

@Component({
  selector: 'app-register-modules',
  imports: [MODULES_IMPORTS],
  templateUrl: './register-modules.html',
})
export class RegisterModules {
  #fb = inject(FormBuilder);
  #formValidationService = inject(FormValidationService);
  #moduleAction = inject(ModulesActions);
  #moduleStore = inject(ModulesStore);

  createModuleForm = ModuleFormsFactory.buildCreateModuleForm(this.#fb);
  r_loading = this.#moduleStore.loading;

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
    this.#moduleAction.create(newModuleData);

    this.closeModal();
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
