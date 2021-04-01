import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(array: any[], page_size: number | string, page_number:number): any[] {
    if(!array.length) return []
    if(page_size === 'all'){
      return array;
    }

    page_size = page_size || 5;
    page_number = page_number || 1;
    --page_number;

    return array.slice(page_number * Number(page_size), (page_number + 1) * Number(page_size));
  }
}