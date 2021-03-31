import { Component, OnInit } from '@angular/core';
import { faUserPlus, faUserEdit, faUserAltSlash, faUserTimes, faUser } from '@fortawesome/free-solid-svg-icons'
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
  
  public admins:any = [];
  public systemLoggeado:Boolean = false;
  public message : String = '';
  public errorBool : Boolean = false;
  public successBool : Boolean = false;
  
  
  constructor(private cookiesService:CookieService,
    private usuariosService:UsuariosService,
    private modalService:NgbModal) { }

  open(content:any){
    this.formularioRegistro.reset();
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

  editAdmin(i:number){
    console.log(i)
  }

  blockAdmin(i:number){
    console.log(i)
  }

  unblockAdmin(i:number){
    console.log(i)
  }

  deleteAdmin(i:number){
    console.log(i)
  }
}
