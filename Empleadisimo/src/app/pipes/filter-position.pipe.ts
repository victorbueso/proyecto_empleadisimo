import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPosition'
})
export class FilterPositionPipe implements PipeTransform {

  transform(value: any[], texto: string): any {
    if(!texto) return value;

    return value.filter(publicacion => publicacion.titulo.toLowerCase().includes(texto.toLowerCase()))
  }

}
