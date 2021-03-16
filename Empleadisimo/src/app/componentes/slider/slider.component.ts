import { Component, OnInit } from '@angular/core';
import { SliderService, sliderData} from '../../services/slider.service'; 

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent{
  
  flagI: number = 0;
  flagD: number = 0;  
  flagC: number = -1;
  slider: sliderData[];

constructor(private _sliderService: SliderService) {
    this.slider = this._sliderService.slider;
    this.flagI = 0;
    this.flagD = this._sliderService.slider.length - 1;
  }
  
  moveSlider(add:number){ 
    for(var i of this.slider){
      if(add == 0 && (this.flagI > 0 || this.flagC == 0)){
        i.position += 100;   
        if(this.flagC == -1){
          this.flagC = 0;
          this.flagD +=1;
          this.flagI -=1;
        }
      }

      if(add == 1 && (this.flagD > 0 || this.flagC == 0)){
        i.position -= 100;
        if(this.flagC == -1){
          this.flagC = 0;
          this.flagI +=1;
          this.flagD -=1;
        }
      }
    }
    this.flagC = -1;
  }
}
      

