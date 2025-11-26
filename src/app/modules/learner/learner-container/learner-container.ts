import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LearnerMenu } from "./learner-menu/learner-menu";
import { MenuItem } from '../../../core/interfaces/menu-item.interface';

@Component({
  selector: 'app-learner-container',
  imports: [RouterOutlet, LearnerMenu],
  templateUrl: './learner-container.html',
})
export class LearnerContainer {
  #router = inject(Router);

  goToModule(item: MenuItem) {
    this.#router.navigate([item.route]);
  }
}
