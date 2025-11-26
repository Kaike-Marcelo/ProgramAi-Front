import { Component, EventEmitter, inject, Output } from '@angular/core';
import { LEARNER_MENU } from './menu-item';
import { MenuLinkButtonComponent } from "../../../../shared/components/complex-components/menu-link-button/menu-link-button";
import { MenuItem } from '../../../../core/interfaces/menu-item.interface';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-learner-menu',
  imports: [MenuLinkButtonComponent],
  templateUrl: './learner-menu.html',
})
export class LearnerMenu {
  @Output() menuItemSelected = new EventEmitter<MenuItem>();

  #authenticationService = inject(AuthenticationService);

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
