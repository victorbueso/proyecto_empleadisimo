import { Component, OnInit } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck as farCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { PublicacionesService } from 'src/app/services/publicaciones.service';


@Component({
  selector: 'app-ver-publicaciones',
  templateUrl: './ver-publicaciones.component.html',
  styleUrls: ['./ver-publicaciones.component.css']
})
export class VerPublicacionesComponent implements OnInit {
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendarCheck = farCalendarCheck;
  page=1;
  public publicaciones:any;

  constructor(private publicacionesService:PublicacionesService) { }

  ngOnInit(): void {
    this.publicacionesService.getPosts()
    .subscribe( result => {
      this.publicaciones = result;
      console.log(this.publicaciones[0].ubicacion.ciudad);
    }, error => {
      console.log(error);
    })
  }

}
