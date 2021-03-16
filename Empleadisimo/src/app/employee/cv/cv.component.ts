import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from '../../services/usuarios.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})


export class CvComponent{
  photoSelected!: string | ArrayBuffer;
  cvUpload = false;
  idEmpleado: string = "";
  curriculums: any = [];
  uploading = false;
  showCv = false;
  file!: File;

  constructor(private userService: UsuariosService,
              private cookiesService: CookieService) {
              this.idEmpleado = this.cookiesService.get("idUser")             
              this.updateCurriculum()
            }

  onPhotoSelected(event:any): void{
    if(event?.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0]
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result!;
      reader.readAsDataURL(this.file); 
    }
  }

  updateCurriculum(){
    this.userService.obtainMyCurriculums(this.idEmpleado).subscribe((res) => {
      this.curriculums = res;
      console.log(this.curriculums)
    }, err => console.error(err))
  }

  
  uploadPhoto(){
    this.uploading = !this.uploading
    this.userService.sendPhoto(this.file, this.idEmpleado).subscribe(res => {
      this.uploading = !this.uploading;
      this.updateCurriculum();
    },
    err => {
      console.error(err)
    })
  }
  
  addCv(){
    this.showCv = false;
    this.cvUpload = !this.cvUpload;   
  }

  listCv(){
    this.cvUpload = false;
    this.showCv = !this.showCv;
  }

}
