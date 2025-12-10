import { Component, inject, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/simple-components/modal/modal.component';
import { FormBuilder } from '@angular/forms';
import { Module } from '../../../../../core/models/module.model';
import { MODULES_IMPORTS } from '../../helpers/imports';
import { INPUT_STYLES } from '../../../../../shared/styles/input-styles';
import { ModulesActions } from '../../action/modules.actions';
import { ModulesStore } from '../../store/modules.store';
import { RequestUserModule } from '../../../../../core/dtos/request/request-module.model';

@Component({
  selector: 'app-register-modules',
  imports: [MODULES_IMPORTS],
  templateUrl: './register-modules.html',
})
export class RegisterModules {
  #moduleAction = inject(ModulesActions);
  #moduleStore = inject(ModulesStore);

  modules = this.#moduleStore.modules;
  r_loading = this.#moduleStore.loading;

  inputGoldenStyle = INPUT_STYLES['golden'];

  @ViewChild('modalCreateModule') modalCreateModule!: ModalComponent;

  selectModule(module: Module): void {
    const addNewModuleToUser: RequestUserModule = {
      moduleId: module.id
    }
    this.#moduleAction.addNewModuleToUser(addNewModuleToUser);
    this.closeModal();
  }

  openRegisterModulesModal() {
    this.#moduleAction.loadAllModules();
    setTimeout(() => this.modalCreateModule.open());
  }

  closeModal() {
    this.modalCreateModule.close();
  }
}
