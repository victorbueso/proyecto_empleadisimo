import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SliderService {
  slider: sliderData[] = [
    {
      img: "assets/img/pexels-andrea-piacquadio-3771045.jpg",
      position: 0
    },
    {
      img: "assets/img/pexels-thisisengineering-3861958.jpg",
      position: 100
    }
  ]

  constructor(
    ) { }

}

export interface sliderData {
  img: string;
  position: number;
}