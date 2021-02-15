import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SliderService {

  slider: sliderData[] = [
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, officiis repellendus eaque, doloremque exercitationem adipisci accusamus cupiditate eius quia facilis nostrum voluptatibus esse quidem harum molestias est sit? Voluptate, quod.",
      classText: "secondary-title",
      position: 0,
      title: "Lorem, ipsum dolor",
      img: "assets/img/pexels-thisisengineering-3861958.jpg",
    },
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, officiis repellendus eaque, doloremque exercitationem adipisci accusamus cupiditate eius quia facilis nostrum voluptatibus esse quidem harum molestias est sit? Voluptate, quod.",
      classText: "main-title",
      position: 100,
      title: "Lorem, ipsum dolor",
      img: "assets/img/pexels-thisisengineering-3862135.jpg",
    },
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, officiis repellendus eaque, doloremque exercitationem adipisci accusamus cupiditate eius quia facilis nostrum voluptatibus esse quidem harum molestias est sit? Voluptate, quod.",
      classText: "secondary-title",
      position: 200,
      title: "Lorem, ipsum dolor",
      img: "assets/img/pexels-anthony-shkraba-4348401.jpg",
    },
  ]

  constructor(
    ) { }

}

export interface sliderData {
  description: string;
  classText: string;
  position: number;
  title: string;
  img: string;
}