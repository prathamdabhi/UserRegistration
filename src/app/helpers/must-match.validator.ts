import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/*************  ✨ Codeium Command 🌟  *************/
/**
 * Validator to check if two controls match.
 * 
 * @param password The name of the first control.
 * @param confirmPassword The name of the second control.
 * @returns A validator function that will be executed against the control.
 */
export function mustMatch(password: string, confirmPassword: string): ValidatorFn {
    return (ctrl: AbstractControl): ValidationErrors | null => {

        const passwordControl = ctrl.get(password);
        const confirmPasswordControl = ctrl.get(confirmPassword);

        // If the confirmPassword control has errors, but not the mustMatch error, don't do anything
        if (confirmPasswordControl?.errors && !confirmPasswordControl.errors['mustMatch']) {

            return null;
        }

        // If the two controls don't match, add the mustMatch error to the confirmPassword control
        if (passwordControl?.value !== confirmPasswordControl?.value) {
            confirmPasswordControl?.setErrors({ mustMatch: true });
        } else {
            // Otherwise, remove the mustMatch error from the confirmPassword control

            confirmPasswordControl?.setErrors(null);
        }

        return null;
    }
}
