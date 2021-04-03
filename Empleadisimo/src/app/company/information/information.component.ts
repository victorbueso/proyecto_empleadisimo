import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "../../interface/Usuario";
import { Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  public publicaciones: Array<any> = []; 
  public usuario!: Usuario;
  id!: string;

  constructor(private publicacionesService:PublicacionesService,
    private usuariosService : UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];},
        err => console.log(err))
        this.publicacionesService.getPostCompany(this.id).
        subscribe(res => {
          for (let i = 0; i < Object.values(res).length; i++) {
            this.publicaciones[i] = Object.values(res)[i];
            }
          //console.log(this.publicaciones);
        }, err => console.log(err))
        this.usuariosService.getUser(this.id).subscribe(res => {
           /*for (let i = 0; i < res.length; i++) {
            this.usuario[i] = res[i];
            }*/
          this.usuario = res;
          //console.log(typeof(this.usuario));
        }, err => console.log(err))
      }
      /*this.publicacionesService.getPostCompany().
      subscribe(
        res=>{
          this.publicaciones = res;        
        },
        err=>console.log(err))*/
      
  
      showid(id:string){
        console.log(id)
      }

      regreso(){
        this.router.navigate(['/employee']);
      }

}
