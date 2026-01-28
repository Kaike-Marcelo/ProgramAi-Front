import { ReactiveFormsModule } from "@angular/forms";
import { PrimaryButtonComponent } from "../../../shared/components/simple-components/button/primary-button/primary-button.component";
import { GameFrame } from "../../../shared/components/simple-components/game-frame/game-frame";
import { InputComponent } from "../../../shared/components/simple-components/input/input";

export const PROFILE_FORM_IMPORTS = [
    GameFrame, 
    ReactiveFormsModule, 
    PrimaryButtonComponent, 
    InputComponent
]