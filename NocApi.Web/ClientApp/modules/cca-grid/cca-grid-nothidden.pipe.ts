import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'notHidden',
    pure: false
})
export class NotHiddenPipe implements PipeTransform {
    transform(items: any[]): any {
        if (!items) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(p => !p.hidden);
    }
}