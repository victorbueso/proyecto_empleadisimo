import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CookieService } from 'ngx-cookie-service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  faArrowLeft  = faArrowLeft;
  faPen = faPen;
  faTimes = faTimes;

  post : any = [];
  dateToday = new Date();

  formPublications = new FormGroup ({
    title: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]),
    description: new FormControl (null, [Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]),
    expirationDate: new FormControl (null, [Validators.required]),
    salary: new FormControl (null, [Validators.required, Validators.minLength(2), Validators.pattern("[0-9]{3,}")]),
    modality: new FormControl (null, [Validators.required, Validators.minLength(1), Validators.pattern("")]),
    profession: new FormControl (null, [Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]),
    city: new FormControl (null, [Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]),
    department: new FormControl (null, [Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]),
    country: new FormControl (null, [Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")])
  });

  constructor(private activatedRoute:ActivatedRoute,
    private publicacionesService:PublicacionesService,
    private router:Router,
    private modalService:NgbModal,
    private usuariosService:UsuariosService,
    private cookiesService:CookieService,
    private helperService:HelperService) { }

  open(content:any){
    this.modalService.open(content,{centered:true})
  }

  openLg(content:any){
    this.modalService.open(content, {size : 'lg'});
    this.formPublications.get('title')?.setValue(this.post.titulo);
    this.formPublications.get('description')?.setValue(this.post.descripcion);
    this.formPublications.get('salary')?.setValue(this.post.cantidadPago);
    this.formPublications.get('profession')?.setValue(this.post.profesion[0]);
    this.formPublications.get('city')?.setValue(this.post.ubicacion.ciudad);
    this.formPublications.get('department')?.setValue(this.post.ubicacion.departamento);
    this.formPublications.get('country')?.setValue(this.post.ubicacion.pais)
  }

  ngOnInit(): void {
    let idPost = this.activatedRoute.snapshot.params.id;
    this.getPost(idPost);
    this.helperService.selectNotificationCompany.subscribe(
      (id) => {
        this.getPost(id);
      }, error => console.log(error))
    
  }

  getPost(idPost){
    this.publicacionesService.getAllInfoPost(idPost)
    .subscribe(res => {
      this.post = res[0];
      let today = new Date();
      this.post.fechaVencimiento = new Date(res[0].fechaVencimiento);
      this.post.fechaPublicacion = new Date(res[0].fechaPublicacion);
      if(this.post.modalidad == 1){
        this.post.modalidad = 'Presencial'
      } else if(this.post.modalidad == 2){
        this.post.modalidad = 'Semipresencial'
      } else if(this.post.modalidad == 3){
        this.post.modalidad = 'Virtual'
      }
      if(today > this.post.fechaVencimiento && this.post.estado == 'vigente'){
        let data = {estado : 'vencida'};
        this.publicacionesService.updateStatus(this.post._id, data).subscribe(
          () => {
            this.post.estado = 'vencida';
          }, error2 => console.log(error2)
        )} else if(today < this.post.fechaVencimiento && this.post.estado == 'vencida'){
          let data = {estado : 'vigente'};
          this.publicacionesService.updateStatus(this.post._id, data).subscribe(
            () => {
              this.post.estado = 'vigente';
            }, error3 => console.log(error3)
          )}
    }, error => console.log(error));
  }

  saveChanges(){
    this.publicacionesService.updatePost(this.post._id, this.formPublications.value)
    .subscribe(res => {
      this.ngOnInit();
      this.formPublications.reset();
      this.modalService.dismissAll();
    }, error => console.log(error))
  }


  deletePost(){
    let data = {estado : 'eliminado'}
    this.publicacionesService.updateStatus(this.post._id, data)
    .subscribe( () => {
      this.router.navigate(['/company']);
      this.modalService.dismissAll();
    }, error => console.log(error)
    )
  }

  hire(usuario:any){
    let data:any;
    this.usuariosService.getUser(this.cookiesService.get('idUser')).subscribe(
      res => {
        data = {
          correo : usuario.correo,
          nombre: usuario.nombreCompleto,
          tituloPublicacion : this.post.titulo,
          empresa: res.nombreCompleto,
        }
        this.publicacionesService.sendHiringEmail(this.post._id, usuario._id, data)
        .subscribe( () => {
        this.router.navigate(['/company'])
        }, err => console.log(err))
      }, error => {
        console.log(error);
      }
    )
    
  }

}
