import { Pipe, PipeTransform } from '@angular/core';
import Identicon, { IdenticonOptions } from "identicon.js";

@Pipe({
  name: 'userIcon',
  standalone: true
})
export class UserIconPipe implements PipeTransform {
  transform(value: string | null, size = 36): string {
    if (value === null) {
      return '';
    }

    const options: IdenticonOptions = {
      background: [255, 255, 255, 50],
      size: size,
      format: 'svg',
    };

    const userImage = new Identicon(value, options);

    return 'data:image/svg+xml;base64,' + userImage.toString();
  }
}
