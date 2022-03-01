import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthFormValue } from '../../interfaces';

export class RepeatPasswordStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const controlInvalid = control?.invalid ?? false;
    const formInvalid = form?.invalid && form.hasError('passwordMismatch');

    return !!((controlInvalid || formInvalid) && (control?.dirty || form?.submitted));
  }
}

@Component({
  selector: 'att-auth-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @Input() showSignUp?: boolean | null;
  @Input() loading?: boolean | null;
  @Output() send = new EventEmitter<AuthFormValue>();

  readonly repeatPasswordStateMatcher = new RepeatPasswordStateMatcher();
  readonly form = this.fb.group({
    name: ['', [this.validateName()]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: [''],
  }, { validators: [this.validatePasswordMismatch()] });

  constructor(private readonly fb: FormBuilder) { }

  submit(): void {
    if (this.form.valid) {
      this.send.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }

  private validateName(): ValidatorFn {
    return control => this.showSignUp ? Validators.required(control) : null;
  }

  private validatePasswordMismatch(): ValidatorFn {
    return (control) => {
      const password = control.get('password');
      const repeatPassword = control.get('repeatPassword');

      return this.showSignUp && password?.value !== repeatPassword?.value ? { passwordMismatch: true } : null;
    };
  }
}
