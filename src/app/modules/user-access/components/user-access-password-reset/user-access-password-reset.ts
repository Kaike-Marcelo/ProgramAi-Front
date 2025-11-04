import { Component } from '@angular/core';
import { UserAccessContainer } from "../user-access-container/user-access-container";
import { RequestCodeFormComponent } from "./request-code-form/request-code-form.component";
import { PasswordResetFormComponent } from "./password-reset-form/password-reset-form.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-access-password-reset',
  imports: [UserAccessContainer, RequestCodeFormComponent, PasswordResetFormComponent, RouterLink],
  templateUrl: './user-access-password-reset.html',
})
export class UserAccessPasswordReset { }
