import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "../../interface/Usuario";
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  public visualizador:string = "publicaciones";
  public publicaciones: any = []; 
  public usuario!:Usuario;
  public siguiendo:string="seguir";
  public curriculums:Array<any> = [];
  id!: string;
  postSelected: string = '';
  postNumber: number;
  cvSelected: number = -1;
  verifiedAccount: Boolean=false;

  constructor(private publicacionesService:PublicacionesService,
    private usuariosService : UsuariosService,
    private activatedRoute: ActivatedRoute,
    private cookiesService: CookieService,
    private router: Router,
    private modalService:NgbModal,
    private helperService:HelperService) {
    }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getInformation(this.id);
    this.helperService.selectNotificationEmployee.subscribe( (id) => {
      this.id = id;
      this.getInformation(this.id);
    }, error => console.log(error));
    this.usuariosService.getUser(this.cookiesService.get('idUser')).subscribe(res =>{
      if(res?.verified != undefined){
        this.verifiedAccount = res?.verified;
      }
    }, () => {})
  }
  
  getInformation(id:string){
    this.publicacionesService.getPostCompany(id).
    subscribe(res => {
      let user = this.cookiesService.get('idUser');
      this.publicaciones = res;
      for (let i = 0; i < this.publicaciones.length; i++) {
        if (this.publicaciones[i].usuarios.includes(user)){
          this.updateButtonStatus(Number(i));
        }
        if(this.publicaciones[i].estado!='vigente'){
          this.publicaciones.splice(i, 1);
          i--;
        }
        
      }
    }, err => console.log(err))
    this.usuariosService.getUser(id).subscribe(result => {
      this.usuario = result;
      if(this.usuario.seguidores.indexOf(this.cookiesService.get('idUser'))!=-1){
        this.siguiendo = "dejar seguir";
      }else{
        this.siguiendo = "seguir";
      } 
    }, err => console.log(err))
    
  }
  
  open(content:any, idPublicacion: string, publicacion: number){
    this.modalService.open(content, {centered: true});
    this.obtenerCurriculums();
    this.postSelected = idPublicacion;
    this.postNumber = publicacion;
   
  }

  obtenerCurriculums(){
    this.usuariosService.getUser(this.cookiesService.get('idUser')).subscribe(
      res=> {
        this.curriculums = res.curriculum;
      }, error => console.log(error)
    )
  }
  
  regreso(){
    this.router.navigate(['/employee']);
  }

  visualizar(input:string){
    this.visualizador = input;
  }

  seguir(){
    if(this.siguiendo!="dejar seguir"){
    var data= {
      idCompany:this.id
    }
    this.usuariosService.followCompany(data,this.cookiesService.get('idUser'))
    .subscribe(
      result=>{
        if(result.message=="se activo seguir la empresa"){
          this.siguiendo = "dejar seguir";
        }
      },error=>{
        console.log(error);
      });
    }else{
      var data= {
        idCompany:this.id
      }
      this.usuariosService.StopfollowCompany(data,this.cookiesService.get('idUser'))
      .subscribe(
        result=>{
          if(result.message=="se activo dejar de seguir la empresa"){
            this.siguiendo = "seguir";
          }
          
        },error=>{
          console.log(error);
        });
    }  
  }

  aplicar(){
    let data = {
      idEmpleado: this.cookiesService.get("idUser"),
      idPublicacion: this.postSelected,
      curriculum : this.curriculums[this.cvSelected]
    };
    this.publicacionesService.updatePostUser(data).subscribe(res => {
      this.ngOnInit();
      this.modalService.dismissAll();
      let notification = {
        idPublicacion : this.postSelected,
        titulo : res.titulo
      }
      this.usuariosService.addNotificationCompany(notification, res.idEmpresa)
      .subscribe( () => {
      }, error => console.log(error));
    }, error => {
    })
    this.updateButtonStatus(this.postNumber);
  }

  updateButtonStatus(i: number){
    this.publicaciones[i]["aplico"] = true;
  }

}
