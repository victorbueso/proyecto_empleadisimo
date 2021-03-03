import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit} from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html'
})
export class UpdateInfoComponent implements OnInit{
  
  nameV: boolean = false; 
  phoneV: boolean = false;
  birthDateV: boolean = false; 
  genderV: boolean = false;

  forma: FormGroup = this.fb.group({

    name: [null, [Validators.required, Validators.pattern("[a-zA-Z\\s]{3,}")]],
    phone: [null, [Validators.required, Validators.pattern("^\\d{4}\\-?\\d{4}$")]],
    birthDate:[null, [Validators.required, this.dateValidator]],
    gender: [null, [Validators.required]]
  
  })
  
  constructor(private fb: FormBuilder, 
              private cookieService: CookieService,
              private userServices: UsuariosService) { 
                
              }

  ngOnInit(){
  }

  invalidName(){
    if(this.forma.get('name')?.touched)
      this.nameV = false;
    return this.forma.get('name')?.invalid && this.forma.get('name')?.touched; 
  }

  invalidPhone(){
    if(this.forma.get('phone')?.touched)
      this.phoneV = false;
    return this.forma.get('phone')?.invalid && this.forma.get('phone')?.touched;
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
    if(this.forma.invalid){
      this.nameV = this.sendName()!;
      this.phoneV = this.sendPhone()!;
      this.genderV = this.sendSex()!;
      this.birthDateV = this.sendBirth()!;
    }else{
      let infoUser = {
        name: this.forma.get('name')?.value,
        phone: this.forma.get('phone')?.value,
        gender: this.forma.get('gender')?.value,
        birthDate: this.forma.get('birthDate')?.value
      }
      this.userServices.updateInfo(infoUser, this.cookieService.get('idUser')).subscribe(
        result=>{
          console.log(result)
          if(result.message === "Datos actualizados correctamente"){
            console.log("Se actualizaron los datos")
          } 
        },
        error=>{
          console.log(error)
        }
      )
    }
  }  
}
