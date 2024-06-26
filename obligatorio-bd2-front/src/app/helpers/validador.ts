import { AbstractControl, ValidatorFn } from '@angular/forms';

export function chequeoContraseñas(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    const passwordControl = control.get(password);
    const confirmPasswordControl = control.get(confirmPassword);

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
        console.log('diferentes');
      return { 'diferentes': true };
    }
    return null;
  };
}

export function equiposDiferentes(control: AbstractControl) {
  const equipoLocal = control.get('equipoLocal')?.value;
  const equipoVisitante = control.get('equipoVisitante')?.value;

  if (equipoLocal && equipoVisitante && equipoLocal === equipoVisitante) {
    return { equiposIguales: true };
  }

  return null;
}