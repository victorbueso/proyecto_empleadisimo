import { FormGroup, FormControl ,FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit} from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
//import { ConsoleReporter } from 'jasmine';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit{

  public successMessage: Boolean=false;
  public errorMessage : Boolean =false;
  public message: String = '';
 /* public lista:string[]=["Femenino","Masculino"];
  public masculino:string = "Masculino";
  public femenino:string = "Femenino";*/

  nameV: boolean = false;
  phoneV: boolean = false;
  birthDateV: boolean = false;
  genderV: boolean = false;
  public usuario:any={};
  public imageURL:string='';

  uploadForm:FormGroup=new FormGroup({
    avatar:new FormControl(''),
    name:new FormControl('')
  });;

  forma: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    profesion: [null, [Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    birthDate:[null, [Validators.required, this.dateValidator]],
    gender: [null, [Validators.required, Validators.minLength(1), Validators.pattern("(Masculino)|(Femenino)")]]

  })


  constructor(
    private fb: FormBuilder,
    private userServices: UsuariosService,
    private cookieService: CookieService,
    private router:Router,
    private helperService: HelperService) {
      userServices.obtenerUsuario(this.cookieService.get('idUser')).subscribe((res:any)=>{
        this.usuario= res;

        if(this.usuario.fotoPerfil!=''){
          this.imageURL = "http://localhost:3000/usuarios/profilePic/"+this.usuario._id;
        }else{
          this.imageURL= '';
        }

        var g:string=''
        if(res.genero === 1){
          g = 'Masculino'
        }else if(res.genero === 0){
          g = 'Femenino'
        }else{
          g = '';
        }
        if(res.profesion.length == 0){
          res.profesion[0]='';
        }
        this.forma.setValue({
          'name':res.nombreCompleto,
          'profesion':res.profesion[0],
          'birthDate':res.fechaNacimiento,
          'gender':g
        })

      })}

  ngOnInit(){
    this.helperService.navbarNoVisible.emit();
  }

  showPreview(event:any){

    const file = (event.target as HTMLInputElement).files![0];
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('avatar')!.updateValueAndValidity()
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


  upload(){
    if(this.usuario.fotoPerfil==''&&this.imageURL!=''){
      let formData = new FormData();
      formData.append('image',this.uploadForm.value.avatar);
      this.userServices.uploadProfileImage(this.usuario._id,formData)
      .subscribe(res=>{
        console.log(res);
      },error=>{
        console.log(error);
      });
    }else{
      if(this.imageURL!="http://localhost:3000/usuarios/profilePic/"+this.usuario._id){
        let formData = new FormData();
        formData.append('image',this.uploadForm.value.avatar);
        this.userServices.updateProfileImage(this.usuario._id,formData)
        .subscribe(res=>{
          //this.router.navigate(['employee']);
          // alert('foto de usuario actualizada');
        });
      }/*else{
        this.message="¡Queremos conocerte! Actualiza tu foto de perfil"
        this.errorMessage=true;
        setTimeout( () => {
          this.message="";
          this.errorMessage = false;
        }, 3000);
          //alert('debe seleccionar una imagen para actualizar su foto de perfil');
      }*/
    }

  }

  invalidName(){
    if(this.forma.get('name')?.touched)
      this.nameV = false;
    return this.forma.get('name')?.invalid && this.forma.get('name')?.touched;
  }

  invalidProfesion(){
    if(this.forma.get('profesion')?.touched)
      this.phoneV = false;
    return this.forma.get('profesion')?.invalid && this.forma.get('profesion')?.touched;
  }

  invalidSex(){
    if(this.forma.get('gender')?.touched)
      this.genderV = false;
    return this.forma.get('gender')?.invalid && this.forma.get('gender')?.touched;
  }

  invalidBirth(){
    if(this.forma.get('birthDate')?.touched)
      this.birthDateV = false;
    return this.forma.get('birthDate')?.invalid && this.forma.get('birthDate')?.touched;
  }

  formatPhone(elementHtml: any){
    if(this.forma.get('phone')?.valid){
      if(elementHtml.value[4] != "-"){
        elementHtml.value =  elementHtml.value.slice(0,4) + '-' + elementHtml.value.slice(4,)
      }
    }
  }

   dateValidator(control: AbstractControl):{[s:string]:Boolean} | null{
    let dateT = new Date(control.value)
    let dateB = new Date()
    let age = Math.abs(dateT.getFullYear() - dateB.getFullYear());
    if(age < 18){
      return {
        dateValidator: true
      }
    }
    return null;
  }

  sendName(){
    return this.forma.get('name')?.invalid && this.forma.get('name')?.untouched;
  }

  sendPhone(){
    return this.forma.get('phone')?.invalid && this.forma.get('phone')?.untouched;
  }

  sendSex(){
    return this.forma.get('gender')?.invalid && this.forma.get('gender')?.untouched;
  }

  sendBirth(){
    return this.forma.get('birthDate')?.invalid && this.forma.get('birthDate')?.untouched;
  }

  sendInformation(){
    this.upload()

    if(!this.forma.valid){
      this.message="¡Ups! Al parecer el formulario no se ha completado."
      this.errorMessage=true;
      setTimeout( () => {
        this.message="";
        this.errorMessage = false;
      }, 3000);
    } else if(this.imageURL==''){
      this.message="¡Queremos conocerte! Actualiza tu foto de perfil"
        this.errorMessage=true;
        setTimeout( () => {
          this.message="";
          this.errorMessage = false;
        }, 3000);
    }else{
      let genero;
      if(this.forma.value.gender == 'Masculino'){
        genero = 1;
      } else {
        genero = 0
      }
      let infoUser = {
        nombreCompleto:this.forma.value.name,
        profesion: this.forma.value.profesion,
        fechaNacimiento : this.forma.value.birthDate,
        genero : this.forma.value.genero || genero 
      }
      this.userServices.updateInfo(infoUser, this.cookieService.get('idUser'))
      .subscribe( () => {
        this.successMessage=true;
        setTimeout( () => {
          this.successMessage=false;
          this.router.navigate(['employee']);
        }, 3000)
      }, error => {
        console.log(error);
      })
    }

  }
}
