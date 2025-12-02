import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { EUserRole } from "../../../../../core/enums/user-role.enum";
import { AuthenticationService } from "../../../../../services/authentication.service";
import { CARD_STYLES } from "../../../../../shared/styles/card-styles";
import { LIST_MODULES_IMPORTS } from "../../helpers/imports";
import { RegisterModules } from "../register-modules/register-modules";
import { ModulesStore } from "../../store/modules.store";
import { ModulesActions } from "../../action/modules.actions";

@Component({
  selector: 'app-list-modules',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LIST_MODULES_IMPORTS, RegisterModules],
  templateUrl: './list-modules.html',
})
export class ListModules implements OnInit {
  #modulesStore = inject(ModulesStore);
  #modulesActions = inject(ModulesActions);
  #authService = inject(AuthenticationService);

  r_loading = this.#modulesStore.loading;

  modulesData = this.#modulesStore.modules;
  userModulesData = this.#modulesStore.userModules;
  idUserModule = this.#modulesStore.idUserModule;

  styleCard = CARD_STYLES['golden'];
  styleCardFromUser = CARD_STYLES['royal'];

  ngOnInit(): void {
    this.#modulesActions.loadAll();
  }

  get isAuthorized(): boolean {
    // Mudar posteriormente para retornar VERDADEIRO se for ADMIN
    return this.#authService.getLoggedInUser()?.role !== EUserRole.Learner;
  }

  isUserModule(moduleId: string): boolean {
    return this.idUserModule().includes(moduleId);
  }
}
