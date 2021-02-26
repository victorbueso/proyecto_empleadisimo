import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HomeEmployeeSliderService, SliderEmployeesData } from '../../services/homeEmployeeSlider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carousel: SliderEmployeesData[];

  constructor(private _homeEmployeeSliderService: HomeEmployeeSliderService, private _ngcarousel: NgbCarouselConfig) {
    this.carousel = this._homeEmployeeSliderService.carousel;
    _ngcarousel.interval = 10000;
    _ngcarousel.pauseOnHover = true;
    _ngcarousel.showNavigationArrows = false;
    _ngcarousel.showNavigationIndicators = false;
  }

  ngOnInit(): void {
  }

}



