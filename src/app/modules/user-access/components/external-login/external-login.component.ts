import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SecondButtonComponent } from '../../../../shared/components/simple-components/button/second-button/second-button.component';

@Component({
  selector: 'app-external-login',
  imports: [SecondButtonComponent],
  templateUrl: './external-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalLoginComponent { }
