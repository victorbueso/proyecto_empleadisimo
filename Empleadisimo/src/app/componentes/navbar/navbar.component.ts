import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { HelperService } from 'src/app/services/helper.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  public pruebaUsuarioLogueado = null;

  public isCollapsed = true;
  public heigth: number = 0;
  @ViewChild('nav') elementView?: ElementRef;
  @ViewChild('registro') registro!:ElementRef;
  @ViewChild('login') login!:ElementRef;
  active=0;
  registroSuccess= false;


  //datos para registro de usuario
  formularioRegistro = new FormGroup({
    rgCorreo: new FormControl('',[Validators.required,Validators.email]),
    rgPassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
    rgConfPassword: new FormControl('',[Validators.required,Validators.minLength(6)])
  }
  );

  //datos para capturar el empleador
  formularioLogin = new FormGroup({
    lgCorreo: new FormControl('',[Validators.required,Validators.email]),
    lgPassword: new FormControl('',[Validators.required,Validators.minLength(6)])
  }
  );

  //datos para capturar 

 get lgCorreo(){
    return this.formularioLogin.get('lgCorreo');
  }

  get lgPassword(){
    return this.formularioLogin.get('lgPassword');
  }


  get rgCorreo(){
    return this.formularioRegistro.get('rgCorreo');
  }
  get rgPassword(){
    return this.formularioRegistro.get('rgPassword');
  }
  
  constructor(private modalService:NgbModal,
              public usuarioService:UsuariosService,
              private helperService:HelperService,
              private cookieService:CookieService,
              private router:Router) { }

  open(content:any) {
    this.registroSuccess= false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  ngOnInit(): void {
    this.helperService.evento.subscribe( () => {
      this.abrirModal();
    });
  }

  abrirModal(){
    this.open(this.registro);
  }

  buttonLogin(){ 

   // data adquirida por el formulario que sera enviada
    var data = {
      correo:this.formularioLogin.value.lgCorreo,
      password:this.formularioLogin.value.lgPassword
    }

  // funcion utilizada para enviar los datos 
    this.usuarioService.loginUsuario(data).subscribe(
      result=>{
        //console.log(result);
        this.formularioLogin.setValue({
          lgCorreo:null,
          lgPassword:null
        });
        this.pruebaUsuarioLogueado = result.idUser;
        //console.log(this.pruebaUsuarioLogueado);
        this.cookieService.set('token', result.token);
        this.cookieService.set('idUser', result.idUser);
        this.cookieService.set('tipo', result.tipo);

        if(result.tipo == 0){
          this.router.navigate(['employee']);
        } else if (result.tipo == 1){
          this.router.navigate(['company']);
        }
        this.modalService.dismissAll();
      },error=>{
        console.log(error);
        alert(error.error.message);
        this.formularioLogin.setValue({
          lgCorreo:null,
          lgPassword:null
        });
      }
    );

  }

  registrarUsuario(){

    if(this.formularioRegistro.value.rgPassword!=this.formularioRegistro.value.rgConfPassword){
        
        this.formularioRegistro.setValue({
          rgCorreo:this.formularioRegistro.value.rgCorreo,
          rgConfPassword:null,
          rgPassword:null
        });
        alert('password no coinciden ');
    }else{

      var data = {
        tipoUsuario:this.active,
        correo:this.formularioRegistro.value.rgCorreo,
        password:this.formularioRegistro.value.rgPassword
      }

      this.usuarioService.registrarUsuario(data).subscribe(
        result=>{
          this.router.navigate(['update-info']);
          this.registroSuccess= true;
        },error=>{
          console.log(error);
          alert(error.error.message);
          this.formularioRegistro.setValue({
            rgCorreo:null,
            rgConfPassword:null,
            rgPassword:null
          });
        }
      );
     
    }
    
  }

  buttonLogout(){
    console.log('logOut');
    this.router.navigate(['']);
    this.pruebaUsuarioLogueado = null;
    this.cookieService.deleteAll();
  }

}
