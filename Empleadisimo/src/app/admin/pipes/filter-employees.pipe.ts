import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmployees'
})
export class FilterEmployeesPipe implements PipeTransform {

  transform(value: any[], texto:string): any {
    if(!texto) return value;

    return value.filter(employee => ( (employee.nombreCompleto.toLowerCase().includes(texto.toLowerCase()))
    || (employee.correo.toLowerCase().includes(texto.toLowerCase()))
    ))
  }

}
