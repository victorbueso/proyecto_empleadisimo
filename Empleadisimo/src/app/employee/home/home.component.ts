import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HomeEmployeeSliderService, SliderEmployeesData } from '../../services/homeEmployeeSlider.service';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck as farCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carousel: SliderEmployeesData[];
  filterPosition ='';
  filterLocation ='';
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendarCheck = farCalendarCheck;
  page_size : number = 5;
  page_number : number = 1;
  pageSizeOptions = [5,10,20,50,100];

  public publicaciones:any;
  constructor(private _homeEmployeeSliderService: HomeEmployeeSliderService,
              private _ngcarousel: NgbCarouselConfig,
              private publicacionesService:PublicacionesService) {
    this.carousel = this._homeEmployeeSliderService.carousel;
    _ngcarousel.interval = 10000;
    _ngcarousel.pauseOnHover = true;
    _ngcarousel.showNavigationArrows = false;
    _ngcarousel.showNavigationIndicators = false;
  }

  ngOnInit(): void {
    this.publicacionesService.getPosts()
    .subscribe( result => {
      this.publicaciones = result;
      console.log(this.publicaciones[0].ubicacion.ciudad);
    }, error => {
      console.log(error);
    })
  }

  handlePage(e:PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;
  }
}



