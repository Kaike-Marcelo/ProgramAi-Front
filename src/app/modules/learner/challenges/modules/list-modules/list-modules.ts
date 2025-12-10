import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
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

  r_loading = this.#modulesStore.loading;
  userModulesData = this.#modulesStore.userModules;

  styleCard = CARD_STYLES['golden'];
  styleCardFromUser = CARD_STYLES['default'];

  ngOnInit(): void {
    this.#modulesActions.loadAllUserModules();
  }

  getLowercaseName(name: string): string {
    return name.toLowerCase().split(' ').join('');
  }
}
