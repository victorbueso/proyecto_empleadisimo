import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  @Output() onClickButton = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  abrirModal(){
    this.onClickButton.emit();
  }

}
