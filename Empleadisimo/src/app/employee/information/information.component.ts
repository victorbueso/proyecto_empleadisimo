import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "../../interface/Usuario";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  public visualizador:string = "publicaciones";
  public publicaciones: Array<any> = []; 
  public usuario!:Usuario;
  public siguiendo:string="seguir";
  id!: string;

  constructor(private publicacionesService:PublicacionesService,
    private usuariosService : UsuariosService,
    private activatedRoute: ActivatedRoute,
    private cookiesService: CookieService,
    private router: Router,) {
    }

    ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.params.id;
        this.publicacionesService.getPostCompany(this.id).
        subscribe(res => {
          for (let i = 0; i < Object.values(res).length; i++) {
            this.publicaciones.push(Object.values(res)[i]);
            }
        }, err => console.log(err))
        this.usuariosService.getUser(this.id).subscribe(result => {
          this.usuario = result;
          if(this.usuario.seguidores.indexOf(this.cookiesService.get('idUser'))!=-1){
            this.siguiendo = "dejar seguir";
          }else{
            this.siguiendo = "seguir";
          }
          
        }, err => console.log(err))
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

      }

}
