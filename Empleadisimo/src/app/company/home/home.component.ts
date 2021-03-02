import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionesService } from '../../services/publicaciones.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  closeResult = '';
  isNotSelected: string = '0'
  isSelected: string = '';

  formPublications: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.minLength(4), Validators.pattern("[a-zA-Z\\s]{3,}")]],
    description: [null, [Validators.required, Validators.minLength(4), Validators.pattern("[a-zA-Z\\s]{3,}")]],
    expirationDate: [null, [Validators.required, Validators.pattern("")]],
    salary: [null, [Validators.required, Validators.minLength(2), Validators.pattern("")]],
    modality: [null, [Validators.required, Validators.minLength(1), Validators.pattern("")]],
    profession: [null, [Validators.required, Validators.minLength(4), Validators.pattern("[a-zA-Z\\s]{3,}")]],
    city: [null, [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z\\s]{2,}")]],
    department: [null, [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z\\s]{2,}")]],
    country: [null, [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z\\s]{2,}")]]
  });

  constructor(
    private _modal: NgbModal,
    private fb: FormBuilder,
    private publicacionesService:PublicacionesService,
    private cookies: CookieService ) {}

  ngOnInit(): void {
  }

  get title(){
    return this.formPublications.get('title')?.invalid && this.formPublications.get('title')?.touched;
  }

  get description (){
    // console.log("Se esta ejecutando la funcion")
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
    /*this.formPublications.get('titulo')?.reset();
    this.formPublications.get('descripcion')?.reset();
    this.formPublications.get('fechaVencimiento')?.reset();
    this.formPublications.get('salario')?.reset();
    this.formPublications.get('modalidad')?.reset();
    this.formPublications.get('profesion')?.reset();
    this.formPublications.get('ciudad')?.reset();
    this.formPublications.get('departamento')?.reset();
    this.formPublications.get('pais')?.reset(); */

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
      console.log(res);
      this.formPublications.reset(this.formPublications);
      console.log()
    }, error => {
      console.log(error);
    });
    console.log(data);
  }

  capturarSelect() {
    this.isSelected = this.isNotSelected;
  }

}


