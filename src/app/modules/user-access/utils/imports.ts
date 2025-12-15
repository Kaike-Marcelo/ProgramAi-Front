import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { PrimaryButtonComponent } from "../../../shared/components/simple-components/button/primary-button/primary-button.component";
import { InputComponent } from "../../../shared/components/simple-components/input/input";
import { UserAccessContainer } from "../components/user-access-container/user-access-container";
import { SecondButtonComponent } from "../../../shared/components/simple-components/button/second-button/second-button.component";
import { ExternalLoginComponent } from "../components/external-login/external-login.component";

export const SIGN_IN_IMPORTS = [
    UserAccessContainer,
    ReactiveFormsModule,
    InputComponent,
    RouterLink,
    PrimaryButtonComponent,
    SecondButtonComponent,
    ExternalLoginComponent,
]

export const SIGN_UP_IMPORTS = [
    UserAccessContainer,
    ReactiveFormsModule,
    InputComponent,
    RouterLink,
    PrimaryButtonComponent,
    SecondButtonComponent,
]