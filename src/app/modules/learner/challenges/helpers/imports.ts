import { ReactiveFormsModule } from "@angular/forms";
import { PrimaryButtonComponent } from "../../../../shared/components/simple-components/button/primary-button/primary-button.component";
import { InputComponent } from "../../../../shared/components/simple-components/input/input";
import { ModulesCard } from "../components/modules/components/modules-card/modules-card";
import { ModalComponent } from "../../../../shared/components/simple-components/modal/modal.component";
import { LabelComponent } from "../../../../shared/components/simple-components/label/label";
import { RegisterModules } from "../components/modules/register-modules/register-modules";
import { RouterOutlet } from "@angular/router";
import { CodeEditorComponent } from "../../../../shared/components/complex-components/code-editor/code-editor";
import { ConsoleOutput } from "../../../../shared/components/complex-components/console-output/console-output";
import { ActionButtons } from "../components/challenge/components/action-buttons/action-buttons";
import { ModalContent } from "../components/challenge/components/modal-content/modal-content";
import { Header } from "../components/shared/header/header";

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

export const CHALLENGE_IMPORTS = [
    Header,
    CodeEditorComponent,
    ConsoleOutput,
    ModalComponent,
    ModalContent,
    ActionButtons
]