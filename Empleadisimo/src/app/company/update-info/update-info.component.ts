import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlus, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faCheck = faCheck;

  public agregarSucursal=false;
  public sucursalEdicion = -1;
  public sucursalesBD:Array<any>=[];
  public usuario:any = {sucursales:[]};
  public errorMessage:Boolean = false;
  public successMessage:Boolean = false;

  forma: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    fechaFundacion:[null, [Validators.required, this.dateValidator]],
    rubros:[null,[Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]]
  });

  sucursalForm: FormGroup = new FormGroup({
    pais: new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]),
    departamento:new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]),
    ciudad:new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]),
    descripcion:new FormControl('',[Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")])
  });


  public imageURL:string='';
  uploadForm:FormGroup=new FormGroup({
    avatar:new FormControl(''),
    name:new FormControl('')
  });;



  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private cookieService: CookieService,
              private router:Router) {

    usuarioService.obtenerUsuario(this.cookieService.get('idUser'))
    .subscribe((res:any)=>{
      console.log(res);
      this.usuario= res;

      if(this.usuario.fotoPerfil!=''){
        this.imageURL = "http://localhost:3000/usuarios/profilePic/"+this.usuario._id;
      }else{
        this.imageURL= '';
      }

      if(this.usuario.sucursales[0]==null){
        this.agregarSucursal= true;
      }
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


  showPreview(event:any){

    const file = (event.target as HTMLInputElement).files![0];
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('avatar')!.updateValueAndValidity()
    console.log(this.uploadForm.get('avatar'));
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

    this.successMessage=false;
    this.errorMessage=false;

    console.log(this.forma.value.name);

    this.usuario.nombreCompleto= this.forma.value.name;
    this.usuario.rubros = this.partirRubros(this.forma.value.rubros);
    this.usuario.fechaFundacion = this.forma.value.fechaFundacion;

    if(this.forma.valid == true){
      console.log(this.usuario);
      this.usuarioService.updateInfoCompany(this.usuario,this.usuario._id)
      .subscribe(res=>{
        console.log('respuesta Edicion');
        console.log(res);
        this.successMessage=true;
        setTimeout(() => {
          this.successMessage=false;
          this.router.navigate(['company']);
        }, 3000)
      },error=>{
        console.log(error);
      });
    } else{
      this.errorMessage = true;
      setTimeout(() => {
        this.errorMessage = false;
      }, 3000);
    }

  }

  formarSucursal(){
    if(this.sucursalEdicion== -1){
      console.log(this.sucursalForm.value);
      this.usuario.sucursales.push(this.sucursalForm.value);
      this.agregarSucursal = false;
      this.sucursalEdicion = -1;
    }else{

      this.usuario.sucursales[this.sucursalEdicion] = this.sucursalForm.value;
      this.sucursalEdicion = -1;
      this.agregarSucursal = false;
    }

  }
  deleteSucursal(index:Number){
    console.log(index);
    console.log(this.usuario.sucursales);
    this.usuario.sucursales.splice(index,1);
  }
  editSucursal(index:number){
    console.log(index);
    console.log(this.usuario.sucursales);
    this.agregarSucursal = true;
    this.sucursalForm.setValue(this.usuario.sucursales[index]);
    this.sucursalEdicion = index;
  }

  upload(){
    if(this.usuario.fotoPerfil==''&&this.imageURL!=''){
      let formData = new FormData();
      console.log('se va a agregar la foto ');
      formData.append('image',this.uploadForm.value.avatar);
      this.usuarioService.uploadProfileImage(this.usuario._id,formData)
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
        this.usuarioService.updateProfileImage(this.usuario._id,formData)
        .subscribe(res=>{
          console.log(res);
          alert('foto de usuario actualizada');
        });
      }else{
          alert('debe seleccionar una imagen para actualizar su foto de perfil');
      }
    }

  }

}
