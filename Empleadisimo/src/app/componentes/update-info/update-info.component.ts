import { FormGroup, FormControl ,FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit} from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html'
})
export class UpdateInfoComponent implements OnInit{
  
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
    name: [null, [Validators.required, Validators.pattern("[a-zA-Z\\s]{3,}")]],
    profesion: [null, [Validators.required, Validators.pattern("^[a-zA-Z\\s\\.]+$")]],
    birthDate:[null, [Validators.required, this.dateValidator]],
    gender: [null, [Validators.required]]
  
  })
  
  // constructor(private fb: FormBuilder, 
  //             private cookieService: CookieService,
  //             private userServices: UsuariosService,
  //             private router:Router) {
  //             }

  constructor(
    private fb: FormBuilder, 
    private userServices: UsuariosService, 
    private cookieService: CookieService, 
    private router:Router) {
      userServices.obtenerUsuario(this.cookieService.get('idUser')).subscribe((res:any)=>{
        console.log(res);
        this.usuario= res;

        if(this.usuario.fotoPerfil!=''){
          this.imageURL = "http://localhost:3000/usuarios/profilePic/"+this.usuario._id;
        }else{
          this.imageURL= '';
        }
      })}

  ngOnInit(){
  }

  showPreview(event:any){
    
    const file = (event.target as HTMLInputElement).files![0];
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('avatar')!.updateValueAndValidity()
    console.log(this.uploadForm.get('avatar'));
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  
  upload(){
    if(this.usuario.fotoPerfil==''&&this.imageURL!=''){
      let formData = new FormData();
      console.log('se va a agregar la foto ');
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
        console.log('se va a actualizar la foto');
        this.userServices.updateProfileImage(this.usuario._id,formData)
        .subscribe(res=>{
          this.router.navigate(['employee']);
          console.log("Irnos")
          // alert('foto de usuario actualizada');
        });
      }else{
          alert('debe seleccionar una imagen para actualizar su foto de perfil');
      }
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
    //if(this.forma.invalid){
    //  this.nameV = this.sendName()!;
    //  this.phoneV = this.sendPhone()!;
    //  this.genderV = this.sendSex()!;  
    //  this.birthDateV = this.sendBirth()!;
    //}else{
    //  let infoUser = {
    //    nombreCompleto: this.forma.get('name')?.value,
    //    phone: this.forma.get('phone')?.value,
    //    genero: this.forma.get('gender')?.value,
    //    fechaNacimiento: this.forma.get('birthDate')?.value
    //  }
    //  this.userServices.updateInfo(infoUser, this.cookieService.get('idUser')).subscribe(
    //    result=>{
    //      if(result.message === "Datos actualizados correctamente"){
    //        console.log(4)
    //        this.router.navigate(['employee']);
    //        console.log("Este resultado")
    //        console.log(result)
    //      } 
    //    },
    //    error=>{
    //      console.log("Error")
    //      console.log(error)
    //    }
    //  )
    //}
  }  
}
