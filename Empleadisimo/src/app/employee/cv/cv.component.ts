import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html'
})


export class CvComponent{
  
  file!: File;
  photoSelected!: string | ArrayBuffer | null;
  cvUpload: boolean = false;

  constructor(private userService: UsuariosService) {}

  onPhotoSelected(event: HtmlInputEvent): void{
    if(event?.target.files && event.target.files[0]){
      
      this.file = <File>event.target.files[0]
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file); 

    }
  }

  addCv(){
    this.cvUpload = !this.cvUpload;
  }

  uploadPhoto(){
    console.log("Esta haciendo el submit")
    this.userService.sendPhoto(this.file)
      .subscribe(res => console.log(res), err => console.error(err))
  }

}
