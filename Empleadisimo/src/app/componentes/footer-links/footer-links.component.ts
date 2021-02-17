import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html'
})

export class FooterLinksComponent{
  
  public show: boolean = true;
  id: string = "";
  info: any;
  content: any[] =
  [
    {
      id: "politicas", 
      description: "Politicas"
    },
    {
      id: "terminos",
      description: "Estos son los terminos"
    },
    {
      id: "mision",
      description: "Esta es la mision"
    },
    {
      id: "vision",
      description: "Esta es la vision"
    }
  ]
  figures: any[] = [
    {
      shape: "circle",
      cy: "20%",
      cx: "0%",
      class: "orange-figure"
    },
    {
      shape: "circle",
      cy: "55%",
      cx: "50%",
      class: "orange-figure"
    },
    {
      shape: "circle",
      cy: "80%",
      cx: "90%",
      class: "blue-figure"
    },
    {
      shape: "circle",
      cy: "80%",
      cx: "20%",
      class: "blue-figure"
    },
    {
      shape: "circle",
      cy: "10%",
      cx: "100%",
      class: "blue-figure"
    }
  ] 

  
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params =>{
        this.getContent(params['id'])
        console.log(this.info)
      }
    )
  }
  
  getContent(id: string){
    for(var i of this.content){
      if(i['id'] == id){
        this.info = i
        console.log(i)
      }
    }
  }

}

export interface figure{
  shape: string;
  cx: string; 
  cy: string;
  class: string;
}

