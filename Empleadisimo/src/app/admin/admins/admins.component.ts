import { Component, OnInit } from '@angular/core';
import { faUserPlus, faUserEdit, faUserAltSlash, faUserTimes, faUser, faTimes } from '@fortawesome/free-solid-svg-icons'
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  faUserPlus = faUserPlus;
  faUserEdit = faUserEdit;
  faUserAltSlash = faUserAltSlash;
  faUserTimes = faUserTimes;
  faUser = faUser;
  faTimes = faTimes;
  
  public admins:any = [];
  public systemLoggeado:Boolean = false;
  public message : String = '';
  public errorBool : Boolean = false;
  public successBool : Boolean = false;
  public editBool : Boolean = false;
  public adminSeleccionado : string = '';
  
  
  constructor(private cookiesService:CookieService,
    private usuariosService:UsuariosService,
    private modalService:NgbModal) { }

  open(content:any, id:string, accion:string){
    this.formularioRegistro.reset();
    this.adminSeleccionado = id;
    if(accion == 'actualizar'){
      this.editBool=true;
      this.usuariosService.getUser(id)
      .subscribe( res => {
        this.formularioRegistro.get('rgNombre')?.setValue(res.nombreCompleto);
        this.formularioRegistro.get('rgCorreo')?.setValue(res.correo);
      }, error => console.log(error));
    }
    this.modalService.open(content, {centered: true})
  }

  formularioRegistro = new FormGroup({
    rgNombre : new FormControl('', [Validators.required]),
    rgCorreo : new FormControl('', [Validators.required, Validators.email]),
    rgPassword : new FormControl('', [Validators.required, Validators.minLength(6)]),
    rgConfirmPassword : new FormControl('', [Validators.required, Validators.minLength(6)]) 
  })

  ngOnInit(): void {
    this.usuariosService.getAdmins()
    .subscribe(res => {
      this.admins = res;
      for(let i in this.admins){
        if(this.admins[i].estado == 'eliminado'){
          this.admins.splice(i, 1);
        }
      }
    }, error => console.log(error));

    this.usuariosService.getUser(this.cookiesService.get('idUser'))
    .subscribe(res => {
      if(res.estado == 'default'){
        this.systemLoggeado = true;
      }
    }, error => console.log(error));
  }


  addAdmin(){
    if(this.formularioRegistro.get('rgPassword')?.value != this.formularioRegistro.get('rgConfirmPassword')?.value){
      this.message="Las contraseñas no coinciden";
      this.errorBool=true
    } else{
      this.usuariosService.newAdmin(this.formularioRegistro.value)
      .subscribe( res => {
        this.message = res.message;
        this.successBool = true;
        this.ngOnInit();
      }, error => {
        this.message = error.error.message;
        this.errorBool = true;
      })
    }

    setTimeout( () => {
      if(this.successBool==true){
        this.modalService.dismissAll();
      }
      this.message="";
      this.errorBool=false;
      this.successBool=false;
    }, 3000);
  }

  editAdmin(){
    if(this.formularioRegistro.get('rgPassword')?.value != this.formularioRegistro.get('rgConfirmPassword')?.value){
      this.message="Las contraseñas no coinciden";
      this.errorBool=true
    } else{
      this.usuariosService.updateInfoAdmin(this.formularioRegistro.value, this.adminSeleccionado)
      .subscribe( res => {
        this.message = res.message;
        this.successBool = true;
        this.ngOnInit();
      }, error => {
        this.message = error.error.message;
        this.errorBool = true;
      })
    }

    setTimeout( () => {
      if(this.successBool==true){
        this.modalService.dismissAll();
      }
      this.message="";
      this.errorBool=false;
      this.successBool=false;
    }, 3000);
  }

  blockAdmin(){
    let data = {estado : 'bloqueado'}
    this.usuariosService.updateStatusAdmin(data, this.adminSeleccionado)
    .subscribe(res => {
      this.modalService.dismissAll();
      this.ngOnInit();
    }, error => console.log(error));
  }

  unblockAdmin(id:string){
    let data = {estado : 'activo'}
    this.usuariosService.updateStatusAdmin(data, id)
    .subscribe(res => {
      this.modalService.dismissAll();
      this.ngOnInit();
    }, error => console.log(error));
  }

  deleteAdmin(){
    let data = {estado : 'eliminado'}
    this.usuariosService.updateStatusAdmin(data, this.adminSeleccionado)
    .subscribe( () => {
      this.modalService.dismissAll();
      this.ngOnInit();
    }, error => console.log(error));
  }
}
