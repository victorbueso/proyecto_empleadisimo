import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbAlert, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionesService } from '../../services/publicaciones.service';
import { CookieService } from 'ngx-cookie-service';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SocketService } from '../../services/socket.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {
  faMapMarkerAlt = faMapMarkerAlt;
  closeResult = '';
  isNotSelected: string = '0'
  isSelected: string = '';
  public publicaciones: any = [];

  successMessage = false;
  successfull = ``;

  formPublications: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    description: [null, [Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    expirationDate: [null, [Validators.required]],
    salary: [null, [Validators.required, Validators.minLength(2), Validators.pattern("[0-9]{3,}")]],
    modality: [null, [Validators.required, Validators.minLength(1), Validators.pattern("")]],
    profession: [null, [Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    city: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    department: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    country: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]]
  });

  constructor(
    private _modal: NgbModal,
    private fb: FormBuilder,
    private publicacionesService:PublicacionesService,
    private cookies: CookieService,
    private usuariosService:UsuariosService,
    private config: NgbModalConfig,
    private socketService: SocketService,
    private router:Router
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.obtainConn();
    this.listenMessage();
  }

  ngOnInit(): void {
    this.publicacionesService.getPostCompany(this.cookies.get("idUser"))
    .subscribe( result => {
      this.publicaciones = result;
      this.publicaciones.forEach((publicacion, index) => {
        let today = new Date();
        publicacion.fechaPublicacion = new Date(publicacion.fechaPublicacion);
        publicacion.fechaVencimiento = new Date(publicacion.fechaVencimiento);
        if(publicacion.fechaVencimiento <= today && publicacion.estado == 'vigente'){
          let data = {estado : 'vencida'}
          this.publicacionesService.updateStatus(publicacion._id, data)
          .subscribe( () => {
          }, error => console.log(error))
        }
      });
    }, error => {
      console.log(error);
    })
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

  listenMessage(){
    this.socketService.listen('recieveMessage').subscribe(
      (res) => console.log(res),
      (err) => console.error(err)
    )
  }

  public SuccessfullMessage() {
    this.successMessage = true;
    this.successfull = `La publicación se ha realizado exitosamente`;
    setTimeout(() => {
      this.successMessage = false;
    }, 3000);
  }

  get title(){
    return this.formPublications.get('title')?.invalid && this.formPublications.get('title')?.touched;
  }

  get description (){
    return this.formPublications.get('description')?.invalid && this.formPublications.get('description')?.touched;
  }

  get expirationDate (){
    return this.formPublications.get('expirationDate')?.invalid && this.formPublications.get('expirationDate')?.touched;
  }

  get salary (){
    return this.formPublications.get('salary')?.invalid && this.formPublications.get('salary')?.touched;
  }

  get modality (){
    return this.formPublications.get('modality')?.invalid && this.formPublications.get('modality')?.touched;
  }

  get profession (){
    return this.formPublications.get('profession')?.invalid && this.formPublications.get('profession')?.touched;
  }

  get city (){
    return this.formPublications.get('city')?.invalid && this.formPublications.get('city')?.touched;
  }

  get department (){
    return this.formPublications.get('department')?.invalid && this.formPublications.get('department')?.touched;
  }

  get country (){
    return this.formPublications.get('country')?.invalid && this.formPublications.get('country')?.touched;
  }

  limpiar(): any {
    this.formPublications.reset(this.formPublications);
  }

  open(content: any) {
    this._modal.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  posting() {

    let data = {
      idEmpresa: this.cookies.get("idUser"),
      titulo: this.formPublications.value.title,
      descripcion: this.formPublications.value.description,
      cantidadPago: parseInt(this.formPublications.value.salary),
      fechaPublicacion: new Date(),
      fechaVencimiento: this.formPublications.value.expirationDate,
      profesion: this.formPublications.value.profession,
      duracionTrabajo: '',
      pais: this.formPublications.value.country,
      departamento: this.formPublications.value.department,
      ciudad: this.formPublications.value.city,
      modalidad: this.formPublications.value.modality
    };

    this.publicacionesService.createPost(data).subscribe(res => {
      let data={
        idPublicacion : res._id,
        titulo : res.titulo,
        fechaPublicacion : res.fechaPublicacion,
        estado:false
      }
      this.guardarNotificacion(data);
      this.formPublications.reset(this.formPublications);
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
    console.log(data);
  }

  guardarNotificacion(data:any){
    this.usuariosService.addNotification(data).
    subscribe(res =>{
      console.log(res);
    },
      error => console.log(error)
    )
  }


  capturarSelect() {
    this.isSelected = this.isNotSelected;
  }

  viewPost(id:string){
    this.router.navigate([`company/post/${id}`])
  }
}


