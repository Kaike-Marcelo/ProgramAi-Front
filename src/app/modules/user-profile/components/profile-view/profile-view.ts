import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthenticatedUser } from '../../../../core/models/user.model';
import { GameFrame } from "../../../../shared/components/simple-components/game-frame/game-frame";

@Component({
  selector: 'app-profile-view',
  imports: [GameFrame],
  templateUrl: './profile-view.html',
})
export class ProfileView {
  @Input() user: AuthenticatedUser | null = null;

  @Output() editProfile = new EventEmitter<void>();

  onEditProfile() {
    this.editProfile.emit();
  }
}
