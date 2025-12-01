import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, ViewChild } from "@angular/core";
import { finalize, forkJoin, Subject, takeUntil } from "rxjs";
import { EUserRole } from "../../../../../core/enums/user-role.enum";
import { Module, ModuleForUser } from "../../../../../core/models/module.model";
import { AuthenticationService } from "../../../../../services/authentication.service";
import { ChallengeService } from "../../../../../services/challenge.service";
import { CARD_STYLES } from "../../../../../shared/styles/card-styles";
import { LIST_MODULES_IMPORTS } from "../../helpers/imports";
import { ModulesService } from "../../../../../services/modules.service";
import { SnackbarService } from "../../../../../shared/services/snackbar.service";
import { RegisterModules } from "../register-modules/register-modules";

@Component({
  selector: 'app-list-modules',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LIST_MODULES_IMPORTS, RegisterModules],
  templateUrl: './list-modules.html',
})
export class ListModules implements OnDestroy, OnInit {
  private destroy$ = new Subject<void>();

  #modulesService = inject(ModulesService);
  #challengeService = inject(ChallengeService);
  #authService = inject(AuthenticationService);
  #snackbarService = inject(SnackbarService);

  r_loading = signal(false);

  modulesData: Module[] = [];
  userModulesData: ModuleForUser[] = [];

  styleCard = CARD_STYLES['golden'];
  styleCardFromUser = CARD_STYLES['royal'];

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
    }).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.r_loading.set(false))
    ).subscribe({
      next: (response) => {
        this.modulesData = response.modules.data;
        this.userModulesData = response.userModules.data;
        this.#snackbarService.showSuccess(response.modules.message);
      },
      error: (err) => {
        this.#snackbarService.showError(err.message);
      }
    });
  }

  get isAuthorized(): boolean {
    // Mudar posteriormente para retornar VERDADEIRO se for ADMIN
    return this.#authService.getLoggedInUser()?.role !== EUserRole.Learner;
  }

  isUserModule(moduleId: string): boolean {
    return this.userModulesData.some(um => um.moduleId === moduleId);
  }
}
