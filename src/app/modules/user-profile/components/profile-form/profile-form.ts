import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, QueryList, Signal, ViewChildren } from '@angular/core';
import { AuthenticatedUser } from '../../../../core/models/user.model';
import { FormBuilder } from '@angular/forms';
import { ProfileUserFormFactory } from '../../helper/profile-user-form.factory';
import { Subject } from 'rxjs';
import { FormValidationService } from '../../../../shared/services/form/form-validation.service';
import { InputComponent } from '../../../../shared/components/simple-components/input/input';
import { INPUT_STYLES } from '../../../../shared/styles/input-styles';
import { PROFILE_FORM_IMPORTS } from '../../helper/imports';
import { CodenameList } from '../../../../core/models/codename.model';
import { SelectGroup, CustomSelect } from '../../../../shared/components/simple-components/custom-select/custom-select';

@Component({
  selector: 'app-profile-form',
  imports: [PROFILE_FORM_IMPORTS, CustomSelect],
  templateUrl: './profile-form.html',
})
export class ProfileForm implements OnInit, OnDestroy {
  @Input() user: AuthenticatedUser | null = null;
  @Input() codenameNameList: CodenameList | null = null;
  @Input() loading!: Signal<boolean>;

  @Output() submit = new EventEmitter<AuthenticatedUser>();
  @Output() cancelEditProfile = new EventEmitter<void>();

  styleInputName = INPUT_STYLES['darkNeutral']

  destroy$ = new Subject<void>();

  #cd = inject(ChangeDetectorRef);
  #fb = inject(FormBuilder);
  profileForm = ProfileUserFormFactory.buildUpdateProfileUserForm(this.#fb);

  #formValidationService = inject(FormValidationService);

  @ViewChildren(InputComponent) appInputs!: QueryList<InputComponent>;

  ngOnInit(): void {
    this.populateForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  populateForm() {
    this.profileForm.reset();
    this.profileForm.patchValue({
      ...this.user
    });
    this.#cd.detectChanges();
  }

  onSaveProfile() {
    if (!this.#formValidationService.validateFormAndShowErrors(this.profileForm, this.appInputs)) return;
    this.submit.emit(this.profileForm.getRawValue());
  }

  onCancelEditProfile() {
    this.cancelEditProfile.emit();
  }

  getErrorMessage(path: string): string {
    return this.#formValidationService.getErrorMessage(this.profileForm, path);
  }

  get codenameGroups(): SelectGroup[] {
    return [
      { label: 'Feminino', options: this.codenameNameList?.female || [] },
      { label: 'Masculino', options: this.codenameNameList?.male || [] },
      { label: 'Neutro', options: this.codenameNameList?.neutral || [] }
    ];
  }

  onCodenameChange(id: string | number) {
    this.profileForm.get('codenameId')?.setValue(id);
  }
}
