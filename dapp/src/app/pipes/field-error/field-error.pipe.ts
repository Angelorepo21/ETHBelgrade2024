import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldError',
  standalone: true
})
export class FieldErrorPipe implements PipeTransform {

  transform(errors: { [K: string]: unknown } | null | undefined, messages: { [K: string]: string } = {}): string {
    if (!errors) {
      return '';
    }

    for (let key in errors) {
      switch (key) {
        case 'required':
          return messages['required'] ?? 'This field is required.';
        case 'email':
          return messages['email'] ?? 'Please enter a valid email.';
        case 'minlength':
          return 'Field must be at least ' + (errors['minlength'] as { requiredLength: number }).requiredLength + ' characters long.';
        case 'match':
          return messages['match'] ?? 'Passwords do not match.';
        case 'matching':
          return messages['matching'] ?? 'Passwords do not match.';
        case 'api':
          return errors['api'] as string;
        default:
          return 'Please check the field value';
      }
    }

    return '';
  }

}
