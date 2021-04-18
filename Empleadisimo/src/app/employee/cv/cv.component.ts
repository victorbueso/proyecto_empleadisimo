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
  titleCurriculum: string = "Seleccione su curriculum";
  titleCurriculumU: string = "Actualize/Cambie su curriculum"
  successFile = false;
  idEmpleado: string = "";
  curriculums: any = [];
  uploading = false;
  cvUpload = false;
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
      this.successFile = false;
      this.titleCurriculum = "Curriculum seleccionado" 
    }
  }

  updateCurriculum(){
    this.userService.obtainMyCurriculums(this.idEmpleado).subscribe((res) => {
      this.curriculums = res;
      this.updateDirCv();
    }, err => console.error(err))
  }

  
  uploadPhoto(){
    this.uploading = !this.uploading
    this.userService.sendPhoto(this.file, this.idEmpleado).subscribe(res => {
      this.uploading = !this.uploading;
      this.updateCurriculum();
      this.successFile = true;
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

  updateDirCv(){
    for(var i = 0; i < this.curriculums.length; i++){
      this.curriculums[i] = `http://localhost:3000/${ this.curriculums[i] }`
    }
  }

  deleteCv(url:string){
    url = `${ url.slice(22, 29) }\\${ url.slice(30) }`
    this.userService.deleteCurriculum(url, this.idEmpleado).subscribe(res => {
      this.updateCurriculum();
    }, err => {
      console.error(err)
    })
  }

  updateCV(url:string){
    url = `${ url.slice(22, 29) }\\${ url.slice(30) }`
    this.uploading = !this.uploading
    this.userService.updateCurriculums(this.file, url, this.idEmpleado).subscribe(res => {
      this.uploading = !this.uploading;
      this.updateCurriculum();
      this.successFile = true;
    },
    err => {
      console.error(err)
    })
  }

}
