import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename',
})
export class FilenamePipe implements PipeTransform {
  transform(value: string): string {
    const match = value.match(/\/([^/]+)\.([a-z0-9]+)$/i);
    if (match) {
      const filename = match[1];
      const extension = match[2];
      return `${filename}.${extension}`;
    } else {
      return value;
    }
  }
}
