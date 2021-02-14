import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isCollapsed = true;
  active=0;

  //datos para registro de usuario
  formularioRegistro = new FormGroup({
    rgCorreo: new FormControl('',[Validators.required,Validators.email]),
    rgPassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
    rgConfPassword: new FormControl('',[Validators.required,Validators.minLength(6)])
  }
  );

  get rgCorreo(){
    return this.formularioRegistro.get('rgCorreo');
  }
  get rgPassword(){
    return this.formularioRegistro.get('rgPassword');
  }
  
  constructor( private modalService:NgbModal,private usuarioService:UsuariosService) { }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  ngOnInit(): void {
  }

  registrarUsuario( ){

    if(this.formularioRegistro.value.rgPassword!=this.formularioRegistro.value.rgConfPassword){
        
        this.formularioRegistro.setValue({
          rgCorreo:this.formularioRegistro.value.rgCorreo,
          rgConfPassword:null,
          rgPassword:null
        });
        alert('password no coinciden ');
    }else{

      var data = {
        tipo:this.active,
        correo:this.formularioRegistro.value.rgCorreo,
        password:this.formularioRegistro.value.rgPassword
      }

      this.usuarioService.obtenerTodosUsuarios().subscribe((res:any)=>{
       var usuarios:Array<any> = res;
       var a=usuarios.find(x => x.correo === data.correo);
       if(a!=undefined){
        this.formularioRegistro.setValue({
          rgCorreo:null,
          rgConfPassword:null,
          rgPassword:null
        });
        alert('correo existe en la base de datos');
        console.log(a);
       }else{
         console.log('no lo encontro');

         this.usuarioService.registrarUsuario(data).subscribe(
           res=>{
            console.log(res);
            alert('usuario ingresado exitosamente');
            this.modalService.dismissAll();
           },
           error=>{
            console.log(error);
           });
         
       }
      },(error:any)=>{
        console.log(error);
      });
      
      console.log(data);
      
    }
    
  }


}
