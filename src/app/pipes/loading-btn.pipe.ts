import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'loadingBtn'
})
export class LoadingBtnPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
