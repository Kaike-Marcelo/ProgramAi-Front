import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { SimpleCardDashboard } from "./components/simple-card-dashboard/simple-card-dashboard";
import { RadialProgress } from "../../../shared/components/simple-components/radial-progress/radial-progress";
import { DashboardActions } from './action/dashboard.actions';
import { DashboardStore } from './store/dashboard.store';
import { CollapsePanel } from "../../../shared/components/simple-components/collapse-panel/collapse-panel";
import { Router } from '@angular/router';
import { ModulesActions } from '../challenges/action/modules.actions';
import { ModulesStore } from '../challenges/store/modules.store';
import { LanguageService } from '../../../shared/services/code-execution/language.service';

@Component({
  selector: 'app-home',
  imports: [SimpleCardDashboard, RadialProgress, CollapsePanel],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  #dashboardAction = inject(DashboardActions);
  #dashboardStore = inject(DashboardStore);
  #modulesAction = inject(ModulesActions);
  #modulesStore = inject(ModulesStore);
  #languageService = inject(LanguageService);
  #router = inject(Router);

  moduleSumary = this.#dashboardStore.moduleSumary;
  modulesFromUser = this.#modulesStore.userModules;

  loadingModuleSumary = this.#dashboardStore.loading;
  loadingModulesFromUser = this.#modulesStore.loading;

  activeTabIndex = signal<string | null>(null);

  activeModule = computed(() => {
    const modules = this.modulesFromUser();
    const activeId = this.activeTabIndex();
    return modules.find(m => m.moduleId === activeId);
  });

  constructor() {
    effect(() => {
      const modules = this.modulesFromUser();
      const activeTabId = this.activeTabIndex();

      if (modules.length > 0 && !activeTabId) {
        const firstModuleId = modules[0].moduleId;
        this.setActiveTab(firstModuleId);
      }
    });
  }

  ngOnInit(): void {
    this.#modulesAction.loadAllUserModules();
  }

  navigateToChallenge(questionId: number) {
    const activeModule = this.activeModule();
    if (activeModule) {
      this.#router.navigate([`learner/modules/${activeModule.moduleId}/challenge/${questionId}`],
        {
          queryParams: { moduleName: activeModule.moduleName }
        }
      );
    }
  }

  setActiveTab(moduleId: string): void {
    this.activeTabIndex.set(moduleId);
    this.#dashboardAction.loadModuleSumary({ moduleId: Number(moduleId) });
  }

  getIconFromLanguage(moduleName: string): string {
    const iconName = this.#languageService.convertLanguageNameToIcon(moduleName.toLowerCase().replace(/\s+/g, ''));
    return `devicon-${iconName}-plain`;
  }
}
