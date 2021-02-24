import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html'
})
export class UpdateInfoComponent implements OnInit{
  
  forma: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    phone: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    birthDate:[null, [Validators.required]]
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

  save(){
    console.log(this.forma.value)
  }
}
