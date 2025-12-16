import { Component, inject } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { AuthenticationService } from '../../../../services/authentication.service';
import { DeviceService } from '../../../services/device.service';
import { ScoreFormatPipe } from '../../../pipes/score-format-pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-floating-top-navbar',
  imports: [ScoreFormatPipe, RouterLink],
  templateUrl: './floating-top-navbar.html',
})
export class FloatingTopNavbar {
  #authService = inject(AuthenticationService);
  deviceService = inject(DeviceService);

  get user(): User | null {
    return this.#authService.getLoggedInUser();
  }

  get isAuthenticated() {
    return this.#authService.isUserAuthenticated()
  }

  get fullName(): string {
    return (this.user?.firstName + ' ' + this.user?.lastName);
  }

  logout() {
    this.#authService.logout();
  }
}
