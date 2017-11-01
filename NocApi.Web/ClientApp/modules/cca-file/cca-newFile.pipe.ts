import { Pipe, PipeTransform } from '@angular/core';
import { ICcaFile } from './cca-file.component';

@Pipe({ name: 'newFile', pure:false })
export class NewFilePipe implements PipeTransform {
    transform(items: ICcaFile[]): any {
        if (!items) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(p => p.status == 0);
    }
}