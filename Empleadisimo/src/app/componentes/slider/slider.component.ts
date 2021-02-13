import { Component, OnInit } from '@angular/core';
import { SliderService, sliderData} from '../../servicios/slider.service'; 

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})

export class SliderComponent{
  
  slider: sliderData[];
  
  constructor(private _sliderService: SliderService) {
    this.slider = this._sliderService.slider;
  }
  
  moveSlider(add:number){
    for(var i of this.slider){
      if(add == 1)
        i.position += 100;
      else
        i.position -= 100;
    }
  }
}
