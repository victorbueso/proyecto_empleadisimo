import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { HomeEmployeeSliderService, SliderEmployeesData } from '../../services/homeEmployeeSlider.service';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck as farCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { PageEvent } from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute } from "@angular/router";
import { ChatService } from "../../services/chat.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*Carousel*/
  // images = [1, 2, 3, 4, 5, 6, 7].map((n) => `../../../assets/img/employees/${n}.jpg`);

  /*Input de búsqueda*/
  filterPosition ='';
  filterLocation ='';
  /*Font awesome*/
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendarCheck = farCalendarCheck;

  /*Paginación*/
  page_size : number = 5;
  page_number : number = 1;
  pageSizeOptions = [5,10,20,50,100];

  /* Saber si un usuario ha aplicado a una publicación de trabajo */
  apply: Boolean = true;

  public informationChat = {};

  public publicaciones: Array<any> = [];

  constructor(private publicacionesService:PublicacionesService,
              private config:NgbCarouselConfig,
              private cookies: CookieService,
              private usuariosService : UsuariosService,
              private socketService : SocketService,
              private router: Router,
              private chatService:ChatService) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false; 
    this.obtainConn();
  }

  ngOnInit(): void {
    this.obtenerPublicaciones()
    this.socketService.listen('nuevaPublicacion')
    .subscribe( () => {
      this.obtenerPublicaciones();
    }, error => console.log(error))
  }

  obtainConn(){
    if(this.usuariosService.imOnline == false){
      this.usuariosService.obtenerUsuario(this.cookies.get('idUser')).subscribe(
        (res) => {
          this.socketService.emit("ObtainData", res )  
          this.usuariosService.imOnline = true;
        }
      )
    }
  }

  obtenerPublicaciones(){
    this.publicacionesService.getPosts()
    .subscribe( result => {
      this.publicaciones = result;
      this.modifyPublications(this.publicaciones)
      this.publicaciones.reverse();

      let user = this.cookies.get('idUser');
      for (let i in this.publicaciones){
          if (this.publicaciones[i].usuarios.includes(user)){
            this.updateButtonStatus(Number(i));
          }
      }
      /*console.log(this.publicaciones[0].ubicacion.ciudad);*/
    }, error => {
      console.log(error);
    })
  }

  handlePage(e:PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;
  }

  disApply() {
      return !this.apply;
  }

  updateApplyPostUser(idPublicacion: string, publicacion: number) {
    let data = {
      idEmpleado: this.cookies.get("idUser"),
      idPublicacion: idPublicacion
    };
    console.log(data);
    this.publicacionesService.updatePostUser(data).subscribe(res => {
      let notification = {
        idPublicacion : idPublicacion,
        titulo : res.titulo
      }
      this.usuariosService.addNotificationCompany(notification, res.idEmpresa)
      .subscribe( () => {
      }, error => console.log(error));
      //console.log(`El usuario ha aplicado a una oferta de empleo, la empresa confirmará su petición.`)
      //console.log(`El usuario ${res} ha aplicado a una oferta de empleo, la empresa confirmará su petición.`)
    }, error => {
      //console.log(`No se ha podido cumplir la petición para aplicar a un trabajo: ${error}`)
    })

    this.updateButtonStatus(publicacion);

  }

  updateButtonStatus(i: number){
    this.publicaciones[i]["aplico"] = true;
  }

  chat(publication:any){
    this.chatService.idChat = publication.idEmpresa
    this.router.navigate(['chat']);
  }

  modifyPublications(publicaciones: any){
    var publicacionModificada = [];
    for(var i in publicaciones){
      publicaciones[i]['aplico'] = false;
    }
  }

  homepage(id:string){
    this.router.navigate([`employee/information/${id}`]);
  }

}
