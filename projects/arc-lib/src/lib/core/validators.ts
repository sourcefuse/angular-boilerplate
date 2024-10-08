import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators {
  static match2Validators(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? {mismatch: true}
        : null;
    };
  }
}

export function keyValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const key = control.value;
    const maxLength = 10;
    const isValid = /^[A-Za-z][A-Za-z0-9]{0,9}$/.test(key);
    return isValid ? null : {keyInvalid: true};
  };
}



export function domainMatchValidator(emailDomain: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const domainValue = control.value;
    return domainValue === emailDomain ? null : { 'domainMismatch': true };
  };
}
