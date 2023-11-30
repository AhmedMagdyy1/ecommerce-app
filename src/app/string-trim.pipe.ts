import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringTrim'
})
export class StringTrimPipe implements PipeTransform {

  transform(value: string, numberOfCharc:number): string {
    return value.split(" ").splice(0,numberOfCharc).join(' ');
  }

}
