import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'walletAddress',
  standalone: true
})
export class WalletAddressPipe implements PipeTransform {

  transform(value: string, splitter = '6:4'): string {
    const [startLength, endLength] = splitter.split(':').map((x) => parseInt(x, 10));
    const start = value.slice(0, startLength);
    const end = value.slice(value.length - endLength);
    return start + '...' + end;
  }

}
