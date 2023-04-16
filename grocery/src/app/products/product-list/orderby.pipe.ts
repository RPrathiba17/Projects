import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../product';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    // sorts the products data based on selected option
    transform(value: Product[], args: string): Product[] {
        if (args === 'Type') {
            return value.sort((a: any, b: any) => {
                if (a.Type > b.Type) {
                    return -1;
                } else if (a.Type < b.Type) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } 
        return value;
    }
}
