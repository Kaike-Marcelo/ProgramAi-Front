import { ReactiveFormsModule } from "@angular/forms";
import { PrimaryButtonComponent } from "../../../../shared/components/simple-components/button/primary-button/primary-button.component";
import { InputComponent } from "../../../../shared/components/simple-components/input/input";
import { ModulesCard } from "../components/modules/components/modules-card/modules-card";
import { ModalComponent } from "../../../../shared/components/simple-components/modal/modal.component";
import { LabelComponent } from "../../../../shared/components/simple-components/label/label";
import { RegisterModules } from "../components/modules/register-modules/register-modules";
import { RouterOutlet } from "@angular/router";

export const MODULES_IMPORTS = [
    ReactiveFormsModule,
    PrimaryButtonComponent,
    InputComponent,
    ModalComponent,
    LabelComponent,
];

export const LIST_MODULES_IMPORTS = [
    ReactiveFormsModule,
    PrimaryButtonComponent,
    InputComponent,
    ModalComponent,
    LabelComponent,
    ModulesCard,
    RegisterModules,
    RouterOutlet
]