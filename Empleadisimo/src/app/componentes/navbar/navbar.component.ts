import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { HelperService } from 'src/app/services/helper.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { faBell as farBell, faCommentDots as farCommentDots } from '@fortawesome/free-regular-svg-icons'
import { SocketService } from 'src/app/services/socket.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  faBell = farBell;
  faCommentDots = farCommentDots;
  faSignOutAlt = faSignOutAlt;

  public successRegistro:Boolean = false;
  public errorRegistro: Boolean = false;
  public errorLogin: Boolean = false;
  public message : String = "";
  public visible : Boolean = true;
  public imgPerfil : string = '/assets/img/usuario-sin-foto.png';

  public pruebaUsuarioLogueado = null;

  public isCollapsed = true;
  public heigth: number = 0;
  @ViewChild('nav') elementView?: ElementRef;
  @ViewChild('registro') registro!:ElementRef;
  @ViewChild('login') login!:ElementRef;
  active=0;
  registroSuccess= false;
  public notificaciones:Array<any> = [];
  public notificacionesC : Array<any> = [];
  public usuarioLoggeado : any = [];
  public nuevaNotificacion:Boolean = false;
  public nuevaNotificacionC:Boolean = false;
  public newMessage : Boolean = false;
  public noLeido : number = 0;
  public noLeidoC : number = 0;
  public notificacionesNoLeidas : any = [];


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
              private router:Router,
              private socketService:SocketService,
              private publicacionesService : PublicacionesService,
              private chatService:ChatService) { }

  open(content:any) {
    this.modalService.dismissAll();
    this.successRegistro = false;
    this.errorRegistro = false;
    this.errorLogin = false;
    this.message = "";

    this.formularioLogin.reset();
    this.formularioRegistro.reset();
    this.registroSuccess= false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  ngOnInit(): void {
    this.helperService.evento.subscribe( () => {
      this.abrirModal();
    });
    this.helperService.navbarVisible.subscribe( () => {
      this.visible = true;
      this.obtenerUsuarioLoggedo();
    })
    this.helperService.navbarNoVisible.subscribe( () => {
      this.visible = false;
    })
    if(!!this.cookieService.get('idUser')){
      this.obtenerUsuarioLoggedo();
      this.obtenerNotificaciones();
    }
    this.socketService.listen('messageServer').subscribe(
      (res:any) => {
        if(res.message.users.includes(this.cookieService.get('idUser'))){
          this.newMessage=true;
        }
      }
    )

    this.socketService.listen('nuevaPublicacion').subscribe(
      res => {
        
        var data : any;
        data = res;
        
        if(this.usuarioLoggeado.siguiendo.includes(data.idEmpresa)){
          this.noLeido++;
        
        this.nuevaNotificacion = true;
        this.notificaciones.unshift({
          idPublicacion:data._id,
          titulo:data.titulo,
          fechaPublicacion: data.fechaPublicacion,
          estado: false
        });
        }
    },
    error=>{
      console.log(error);
    });
    var idUser =this.cookieService.get('idUser')
    if(idUser!=''){
      this.socketService.listen(idUser).subscribe(
        () =>{
          this.obtenerNotificaciones();
        //   this.noLeidoC = this.noLeidoC + 1;
        //   var data : any;
        //   data = res;
        //   this.nuevaNotificacionC = true;
        //   this.notificacionesC.unshift({
        //   idPublicacion:data.idPublicacion,
        //   titulo:data.titulo,
        //   fechaAplicacion: data.fechaAplicacion,
        //   estado: false
        // });
      },
      error=>{
        console.log(error);
      });
    }
  }

  abrirModal(){
    this.open(this.registro);
  }

  obtenerUsuarioLoggedo(){
    this.usuarioService.getUser(this.cookieService.get('idUser'))
    .subscribe(res => {
      this.usuarioLoggeado = {
        id: res._id,
        nombre: res.nombreCompleto,
        fotoPerfil : res.fotoPerfil,
        siguiendo: res.siguiendo
      }
      if(res?.fotoPerfil != ''){
        this.imgPerfil = `http://localhost:3000/${this.usuarioLoggeado.fotoPerfil}`
      }
    }, error => {
      console.log(error);
    })
  }

  obtenerNotificaciones(){
    this.noLeidoC=0;
    this.noLeido=0;
    this.usuarioService.getNotifications(this.cookieService.get('idUser'))
    .subscribe(res => {
      if(this.cookieService.get('tipo')=='0'){
        this.notificaciones = res[0].notificaciones;
        this.notificaciones.reverse();
        if(this.notificaciones.length != 0 && this.notificaciones[0].estado == false){
          this.nuevaNotificacion = true;
        }
        this.notificaciones.forEach(notificacion => {
          if(notificacion.estado == false){
            this.noLeido++;
          }
        })
      } else if(this.cookieService.get('tipo')=='1'){
        this.notificacionesC = res[0].notificaciones
        this.notificacionesC.reverse();
        if(this.notificacionesC.length != 0 && this.notificacionesC[0].estado == false){
          this.nuevaNotificacionC = true;
        }
        this.notificacionesC.forEach(notificacion => {
          if(notificacion.estado == false){
            this.noLeidoC++;
          }
        });
      }

    }, error => {
      console.log(error);
    })
  }

  buttonLogin(){
    this.message="";
    this.errorLogin = false;
   // data adquirida por el formulario que sera enviada
    var data = {
      correo:this.formularioLogin.value.lgCorreo,
      password:this.formularioLogin.value.lgPassword
    }

  // funcion utilizada para enviar los datos
    this.usuarioService.loginUsuario(data).subscribe(
      result=>{
        this.formularioLogin.reset();
        this.pruebaUsuarioLogueado = result.idUser;
        this.cookieService.set('token', result.token);
        this.cookieService.set('idUser', result.idUser);
        this.cookieService.set('tipo', result.tipo);

        if(result.tipo == 0){
          this.router.navigate(['employee']);
          this.ngOnInit();
        } else if (result.tipo == 1){
          this.router.navigate(['company']);
          this.ngOnInit();
        } else if( result.tipo == 2){
          this.router.navigate(['admin']);
          this.ngOnInit();
        }
        this.formularioLogin.reset();
        this.modalService.dismissAll();
      },error=>{
        this.errorLogin=true;
        this.message=error.error.message;
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
        this.errorRegistro=true;
        this.message='Contraseñas no coinciden';
        setTimeout( () => {
          this.errorRegistro = false;
          this.message="";
        }, 3000)
    }else{

      var data = {
        tipoUsuario:this.active,
        correo:this.formularioRegistro.value.rgCorreo,
        password:this.formularioRegistro.value.rgPassword
      }

      this.usuarioService.registrarUsuario(data).subscribe(
        result=>{
          this.registroSuccess= true;
          this.successRegistro=true;
          this.sendMessage(data.correo, result.token, result.idUser);
          setTimeout(() =>
            {
              this.formularioRegistro.reset();
              this.successRegistro=false;
              if(data.tipoUsuario==1){
                  this.router.navigate(['company/update-info']);
              }else{
              this.router.navigate(['employee/update-info']);
              }
              this.cookieService.set('token', result.token);
              this.cookieService.set('idUser', result.idUser);
              this.cookieService.set('tipo', result.tipo); 
              this.modalService.dismissAll(); 
            },
            3000);
        },error=>{
          this.errorRegistro=true;
          this.message=error.error.message;
          setTimeout( () => {
            this.message="";
            this.errorRegistro = false;

            this.formularioRegistro.reset();
          }, 3000)

        }
      );

    }

  }

  buttonLogout(){
    this.router.navigate(['/']);
    this.pruebaUsuarioLogueado = null;
    this.cookieService.deleteAll();
  }

  notificacionSeleccionadaEmpresa(id:string){
    this.router.navigate([`/company/post/${id}`])
    this.helperService.selectNotificationCompany.emit(id);
  }

  notificacionSeleccionadaEmpleado(id:string){
    this.publicacionesService.getPost(id).subscribe(
      res =>  {
        this.router.navigate([`/employee/information/${res.idEmpresa}`]);
        this.helperService.selectNotificationEmployee.emit(res.idEmpresa);
      }, error => console.log(error)
    )
  }

  openNotifications(){
    if(this.nuevaNotificacion == true || this.nuevaNotificacionC == true){
      this.nuevaNotificacion = false;
      this.nuevaNotificacionC = false;
      this.noLeidoC = 0;
      this.noLeido = 0;
      this.usuarioService.readNotifications(this.cookieService.get('idUser'))
      .subscribe( () => {
        setTimeout( () => {
          this.obtenerNotificaciones()
        }, 1000)
      }, error => console.log(error));
    }
  }

  sendMessage(data: any, token: any, user: any) {
    let verifyInfo = {
      correo: data,
      token: token,
      idUser: user
    }

    this.usuarioService.sendEmailVerification(verifyInfo).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

  showSidebar(){
    this.helperService.sidebarEvent.emit();
  }

  showActivePosts(){
    this.helperService.postsVigente.emit();
  }

  showUnactivePosts(){
    this.helperService.postsVencido.emit();
  }

  showAllPosts(){
    this.helperService.postsHistorial.emit();
  }

  hiredPeople(){
    this.helperService.contratados.emit();
  }

  navChat(){
    this.newMessage=false;
    this.router.navigate(['chat']);
  }

  updateProfile(){
    let tipoUsuario = this.cookieService.get('tipo');
    if(tipoUsuario=='0'){
      this.router.navigate(['/employee/update-info'])
    } else{
      this.router.navigate(['/company/update-info'])
    }
  }

} 
