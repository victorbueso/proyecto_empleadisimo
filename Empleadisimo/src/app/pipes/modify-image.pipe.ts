import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifyImage'
})
export class ModifyImagePipe implements PipeTransform {

  transform(value: String) {
    if(value != ''){
      return "http://localhost:3000/" + value;
    }else{
      return 'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon-715x715.png';
    }
  }

}
