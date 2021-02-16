import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html'
})
export class FooterLinksComponent implements AfterViewInit{

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

  constructor() {
  }
  
  ngAfterViewInit() {
  }

}
export interface figure{
  shape: string;
  cx: string; 
  cy: string;
  class: string;
}