import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLocation'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], texto: string): any {
    if(!texto) return value;
    
    return value.filter(publicacion => (publicacion.ubicacion.ciudad.toLowerCase().includes(texto.toLowerCase()) 
    || publicacion.ubicacion.departamento.toLowerCase().includes(texto.toLowerCase())))

  }

}
