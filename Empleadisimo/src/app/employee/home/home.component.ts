import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  curriculums : any = [];
  cvSelected : number = -1;
  postSelected : string = '';
  postNumber : number;
  cvlength: any = [];
  cvl: number;


/*Mensaje de alerta de cv( cuando un empleado aplica a un trabajo sin haber subido un cv) */
  public errorMessage:Boolean = false;


  public informationChat = {};

  public publicaciones: Array<any> = [];

  constructor(private publicacionesService:PublicacionesService,
              private cookies: CookieService,
              private modalService:NgbModal,
              private usuariosService : UsuariosService,
              private socketService : SocketService,
              private router: Router,
              private chatService:ChatService) {
    this.obtainConn();
  }

  checkcv(){
    this.obtenerCurriculums();
    }

  open(content:any, idPublicacion: string, publicacion: number){
    this.obtenerCurriculums();
    console.log(this.cvl)
    if(this.cvl === 0){
      setTimeout(function() { alert("Porfavor ingresar un cv para aplicar a un trabajo"); }, 3000);
    }else{
    this.modalService.open(content, {centered: true});
    this.obtenerCurriculums();
    this.postSelected = idPublicacion;
    this.postNumber = publicacion;
   } 
  }

  ngOnInit(): void {
    this.obtenerCurriculums();
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

  obtenerCurriculums(){
    this.usuariosService.getUser(this.cookies.get('idUser')).subscribe(
      res=> {
        this.curriculums = res.curriculum;
        this.cvl = this.curriculums.length
      }, error => console.log(error)
    )
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

  updateApplyPostUser() {
    let data = {
      idEmpleado: this.cookies.get("idUser"),
      idPublicacion: this.postSelected,
      curriculum : this.curriculums[this.cvSelected]
    };
    console.log(data);
    this.publicacionesService.updatePostUser(data).subscribe(res => {
      this.obtenerPublicaciones();
      this.modalService.dismissAll();
      let notification = {
        idPublicacion : this.postSelected,
        titulo : res.titulo
      }
      this.usuariosService.addNotificationCompany(notification, res.idEmpresa)
      .subscribe( () => {
      }, error => console.log(error));
    }, error => {
      //console.log(`No se ha podido cumplir la petición para aplicar a un trabajo: ${error}`)
    })
    this.updateButtonStatus(this.postNumber);

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
