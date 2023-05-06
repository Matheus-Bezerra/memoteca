import { AbstractControl } from "@angular/forms";

export function nameValidator(control: AbstractControl) {
    const username = control.value as string
    if(!username) {
        return null
    }

    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const valid = nameRegex.test(username);

    return valid ? null : {invalidName: true};
}