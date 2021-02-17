import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SliderService {

  slider: sliderData[] = [
    {
      description: "Mi objetivo siempre es crear espacios que potencien la interacción con las audiencias y empleadisimo ha sido pieza fundamental en mi desarrollo.",
      classText: "secondary-title",
      position: 0,
      title: "Gwen Stacy",
      img: "assets/img/pexels-thisisengineering-3861958.jpg",
    },
    {
      description: "Empleadisimo se ha convertido en una herramienta indispensable en cada proceso donde selecciono una oferta de trabajo, ya que simplifica la búsqueda de oportunidades y los contactos son muy rápidos.",
      classText: "main-title",
      position: 100,
      title: "Peter parker",
      img: "assets/img/pexels-thisisengineering-3862135.jpg",
    },
    {
      description: "El secreto para contratar a los mejores es buscar a personas que quieran cambiar al mundo y empleadisimo ha sido pieza clave en lograrlo",
      classText: "secondary-title",
      position: 200,
      title: "May Parker",
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