import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { LEARNER_MENU } from './menu-item';
import { MenuLinkButtonComponent } from "../../../../shared/components/complex-components/menu-link-button/menu-link-button";
import { MenuItem } from '../../../../core/interfaces/menu-item.interface';
import { AuthenticationService } from '../../../../services/authentication.service';
import { DeviceService } from '../../../../shared/services/device.service';
import { RouterLink, RouterModule } from "@angular/router";
import { NotificationBadge } from "../../../../shared/components/complex-components/notification-badge/notification-badge";

@Component({
  selector: 'app-learner-menu',
  imports: [MenuLinkButtonComponent, RouterLink, RouterModule, NotificationBadge],
  templateUrl: './learner-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnerMenu {
  @Output() menuItemSelected = new EventEmitter<MenuItem>();

  #authenticationService = inject(AuthenticationService);
  deviceService = inject(DeviceService);

  menuItems = LEARNER_MENU;

  onMenuClick(item: MenuItem) {
    this.menuItemSelected.emit(item);
    this.toggleDrawer();
  }

  toggleDrawer() {
    const drawerCheckbox = document.getElementById('my-drawer-2') as HTMLInputElement;

    if (drawerCheckbox) {
      drawerCheckbox.checked = !drawerCheckbox.checked;
    }
  }

  logout() {
    this.#authenticationService.logout();
  }
}
