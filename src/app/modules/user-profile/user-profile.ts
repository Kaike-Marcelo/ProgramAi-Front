import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserActions } from './actions/user.actions';
import { UserStore } from './store/user.store';
import { ProfileView } from "./components/profile-view/profile-view";
import { ProfileForm } from "./components/profile-form/profile-form";
import { AuthenticatedUser } from '../../core/models/user.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [ProfileView, ProfileForm],
  templateUrl: './user-profile.html',
})
export class UserProfile implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  #userAction = inject(UserActions);
  #userStore = inject(UserStore);

  user = this.#userStore.user;
  codenameList = this.#userStore.codenameList;
  loading = this.#userStore.loading;
  isEditing = false;

  ngOnInit(): void {
    this.#userAction.loadAuthenticatedUser();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.#userAction.loadCodenames();
    }
  }

  onSubmitUpdate(request: AuthenticatedUser) {
    this.#userAction.updateUser(request).subscribe(() => {
      this.isEditing = false;
    })
  }
}
