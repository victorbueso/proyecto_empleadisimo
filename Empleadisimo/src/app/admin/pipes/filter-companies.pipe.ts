import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCompanies'
})
export class FilterCompaniesPipe implements PipeTransform {

  transform(value: any[], texto:string): any {
    if(!texto) return value;

    return value.filter(company => ( (company.nombreCompleto.toLowerCase().includes(texto.toLowerCase()))
    || (company.correo.toLowerCase().includes(texto.toLowerCase()))
    ))
  }

}
