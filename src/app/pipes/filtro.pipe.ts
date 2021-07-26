import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[],
    text: string,
    columna: string): any[] {
    // console.log('text===>' ,text);
    // console.log('columna===>' ,columna);
    // console.log(arreglo);
    if (text === '') {
      return arreglo;
    }
    if (!arreglo) {
      return arreglo;
    }
    text = text.toLocaleLowerCase();
    return arreglo.filter(
      item => item[columna].toLocaleLowerCase().includes(text)
    );
  }

}
