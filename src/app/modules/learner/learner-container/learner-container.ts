import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LearnerMenu } from "./learner-menu/learner-menu";
import { MenuItem } from '../../../core/interfaces/menu-item.interface';
import { BreadcrumbComponent } from "../../../core/layouts/breadcrumb/breadcrumb";
import { FloatingTopNavbar } from "../../../shared/components/complex-components/floating-top-navbar/floating-top-navbar";
import { DeviceService } from '../../../shared/services/device.service';

@Component({
  selector: 'app-learner-container',
  imports: [RouterOutlet, LearnerMenu, BreadcrumbComponent, FloatingTopNavbar],
  templateUrl: './learner-container.html',
  styleUrl: '../../../shared/styles/scroll-bar.scss',
})
export class LearnerContainer {
  #router = inject(Router);
  deviceService = inject(DeviceService);

  goToModule(item: MenuItem) {
    this.#router.navigate([item.route]);
  }
}
