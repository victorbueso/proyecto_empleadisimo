import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ɵangular_packages_router_router_j } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  uri = "http://localhost:3000/api";

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

  updateInfo(userInfo:any, idUser:string):Observable<any>{
    return this.httpClient.put(`http://localhost:3000/usuarios/updateEmployee/${idUser}`, userInfo)
  }
  
  updateInfoCompany(data:any,idUser:string):Observable<any>{
    return this.httpClient.post(`http://localhost:3000/usuarios/updateCompany/${idUser}`,data);
  }

  uploadProfileImage(idUser:string,data:any):Observable<any>{
    return this.httpClient.put(`http://localhost:3000/usuarios/profilePic/${idUser}`,data);
  }
  updateProfileImage(idUser:string,data:any):Observable<any>{
    return this.httpClient.put(`http://localhost:3000/usuarios/updatePic/${idUser}`,data);
  }

  obtenerUsuario(idUsuario:any){
    return this.httpClient.get(`http://localhost:3000/usuarios/${idUsuario}`)
  }

  loggedIn(){
    return !!this.cookieService.get('token');
  }

  isCompanyLogged(){
    if(this.cookieService.get('tipo')=='1'){
      return true
    }

    return false
  }

  sendPhoto(cv: File){
    
    const fd = new FormData();
    fd.append('myFile', cv);
    
    return this.httpClient.post(this.uri + '/photos', fd);

  }

  isEmployeeLogged(){
    if(this.cookieService.get('tipo')=='0'){
      return true
    }
    return false
  }
}
 