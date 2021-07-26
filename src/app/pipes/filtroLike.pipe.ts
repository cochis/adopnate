/* eslint-disable @typescript-eslint/prefer-for-of */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroLike'
})

export class FiltroLikePipe implements PipeTransform {
    transform(arreglo: any[],
        uidPet: string): number {
        let  count = 0;
        if (!arreglo) {
            return 0;
        }
        arreglo.forEach((item) => {
            if (item.uidPet === uidPet && item.actived) {
                count++;
            }
        });
        return count;
    }
}
