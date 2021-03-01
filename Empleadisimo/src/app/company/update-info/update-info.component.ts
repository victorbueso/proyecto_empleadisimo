import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  faPlus = faPlus;
  public agregarSucursal=false;
  public sucursalesBD:Array<any>=[];
  public usuario:any;
  ejemplo = {
    pais:'Honduras',
    departamento:'Francisco Morazan',
    ciudad:'Tegucigalpa',
    descripcion:'Frente a la UNAH'
  }
  forma: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.pattern("[a-zA-Z\\s]{3,}")]],
    fechaFundacion:[null, [Validators.required]],
    rubros:[null,[Validators.required]]
  });

  sucursalForm: FormGroup = new FormGroup({
    pais: new FormControl('',Validators.required),
    departamento:new FormControl('',Validators.required),
    ciudad:new FormControl('',Validators.required),
    descripcion:new FormControl('',Validators.required)
  });


  public imageURL:string='';
  uploadForm:FormGroup=new FormGroup({  
    avatar:new FormControl(''),
    name:new FormControl('')
  });;

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private cookieService: CookieService) {
    
    usuarioService.obtenerUsuario(this.cookieService.get('idUser'))
    .subscribe((res:any)=>{
      console.log(res);
      this.usuario= res;
      var s:string='';
      if(res.rubros[0]!=null){
        console.log('Hay rubros');
        for (let i = 0; i < res.rubros.length; i++) {
          if(i>=1){
            s =s+", "+ res.rubros[i];
          }else{
            s=res.rubros[i];
          }
          
        }
      }else{
        
      }
      console.log(s);
      this.forma.setValue({
        'name':res.nombreCompleto,
        'fechaFundacion':res.fechaFundacion,
        'rubros':s
      });

    },error=>{});
    

   }

  ngOnInit(): void {
  }
  invalidName(){
    return this.forma.get('name')?.invalid && this.forma.get('name')?.touched; 
  }

  /* invalidPhone(){
    // console.log("Se esta ejecutando la funcion")
    return this.forma.get('phone')?.invalid && this.forma.get('phone')?.touched;
  } */


  
  invalidFechaFundacion(){
    return this.forma.get('fechaFundacion')?.invalid && this.forma.get('fechaFundacion')?.touched;
  }
  
  /* formatPhone(elementHtml: any){
    if(this.forma.get('phone')?.valid){
      if(elementHtml.value[4] != "-"){
        elementHtml.value =  elementHtml.value.slice(0,4) + '-' + elementHtml.value.slice(4,)
      }
    }
  } */

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
  showPreview(event:any){
    
    const file = (event.target as HTMLInputElement).files![0];
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('avatar')!.updateValueAndValidity()
    
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  partirRubros(rubros:string):Array<string>{
    if(rubros!=''){
      return rubros.split(", ");
    }else{
      return []
    }
    
  }
  actualizarPerfil(){
    console.log(this.forma.value.name);

    this.usuario.nombreCompleto= this.forma.value.name;
    this.usuario.rubros = this.partirRubros(this.forma.value.rubros);
    this.usuario.fechaFundacion = this.forma.value.fechaFundacion;
    console.log(this.usuario);

    this.usuarioService.updateInfoCompany(this.usuario,this.usuario._id)
    .subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error);
    });
  }

}
