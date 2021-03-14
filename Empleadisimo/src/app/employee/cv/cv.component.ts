import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from '../../services/usuarios.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html'
})


export class CvComponent{
  idEmpleado: string = "";
  file!: File;
  photoSelected!: string | ArrayBuffer;
  cvUpload: boolean = false;

  constructor(private userService: UsuariosService,
              private cookiesService: CookieService) {
              this.idEmpleado = this.cookiesService.get("idUser")
              console.log(this.idEmpleado)
              }

  onPhotoSelected(event:any): void{
    if(event?.target.files && event.target.files[0]){
      console.log(this.file)
      this.file = <File>event.target.files[0]
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result!;
      reader.readAsDataURL(this.file); 

    }
  }

  addCv(){
    this.cvUpload = !this.cvUpload;
  }

  uploadPhoto(){
    
    this.userService.sendPhoto(this.file, this.idEmpleado)
      .subscribe(res => console.log(res), err => console.error(err))
  }

}
