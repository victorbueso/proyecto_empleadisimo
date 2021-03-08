import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html'
})
export class CvComponent{

  cvUpload: boolean = false;

  constructor() { }

  addCv(){
    this.cvUpload = !this.cvUpload;
  }

}
