import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, PatternValidator, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html'
})
export class UpdateInfoComponent implements OnInit{
  
  forma: FormGroup = this.fb.group({

    name: [null, [Validators.required, Validators.pattern("[a-zA-Z\\s]{3,}")]],
    phone: [null, [Validators.required, Validators.pattern("^\\d{4}\\-?\\d{4}$")]],
    birthDate:[null, [Validators.required]],
    gender: [null, [Validators.required]]
  
  })
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(){
  }

  invalidName(){
    return this.forma.get('name')?.invalid && this.forma.get('name')?.touched; 
  }

  invalidPhone(){
    // console.log("Se esta ejecutando la funcion")
    return this.forma.get('phone')?.invalid && this.forma.get('phone')?.touched;
  }

  invalidSex(){
    return this.forma.get('gender')?.invalid && this.forma.get('gender')?.touched;
  }
  
  invalidBirth(){
    return this.forma.get('birthDate')?.invalid && this.forma.get('birthDate')?.touched;
  }
  
  formatPhone(elementHtml: any){
    if(this.forma.get('phone')?.valid){
      if(elementHtml.value[4] != "-"){
        elementHtml.value =  elementHtml.value.slice(0,4) + '-' + elementHtml.value.slice(4,)
      }
    }
  }

   dateValidator(control: AbstractControl){
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

  save(){
    console.log("Estorbas")
  }  
}
