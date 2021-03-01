import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ɵangular_packages_router_router_j } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient:HttpClient,
              private cookieService:CookieService) { }


  loginUsuario(data:any):Observable<any>{
    return this.httpClient.post(`http://localhost:3000/usuarios/signin`,data);
  }

  registrarUsuario(data:any):Observable<any>{
    return this.httpClient.post(`http://localhost:3000/usuarios`,data);
  }

  obtenerTodosUsuarios():Observable<any>{
    return this.httpClient.get(`http://localhost:3000/usuarios`,{});
  }

  updateInfoCompany(data:any,idUser:string):Observable<any>{
    return this.httpClient.post(`http://localhost:3000/usuarios/updateCompany/${idUser}`,data);
  }

  updateInfo(userInfo:any, idUser:number):Observable<any>{
    return this.httpClient.post(`http://localhost:3000/usuarios/updateEmployee/${idUser}`, userInfo)
  }

  obtenerUsuario(idUsuario:any){
    return this.httpClient.get(`http://localhost:3000/usuarios/${idUsuario}`)
  }

  loggedIn(){
    return !!this.cookieService.get('token');
  }
}
 