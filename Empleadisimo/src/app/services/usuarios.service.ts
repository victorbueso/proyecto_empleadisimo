import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ɵangular_packages_router_router_j } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url="http://localhost:3000/usuarios"

  constructor(private httpClient:HttpClient,
              private cookieService:CookieService) { }


  loginUsuario(data:any):Observable<any>{
    return this.httpClient.post(`${this.url}/signin`,data);
  }

  registrarUsuario(data:any):Observable<any>{
    return this.httpClient.post(`${this.url}`,data);
  }

  obtenerTodosUsuarios():Observable<any>{
    return this.httpClient.get(`${this.url}`,{});
  }

  getUser(idUser:string) : Observable<any> {
    return this.httpClient.get(`${this.url}/${idUser}`)
  }

  updateInfo(userInfo:any, idUser:string):Observable<any>{
    return this.httpClient.put(`${this.url}/updateEmployee/${idUser}`, userInfo)
  }

  updateInfoCompany(data:any,idUser:string):Observable<any>{
    return this.httpClient.post(`${this.url}/updateCompany/${idUser}`,data);
  }

  uploadProfileImage(idUser:string,data:any):Observable<any>{
    return this.httpClient.put(`${this.url}/profilePic/${idUser}`,data);
  }
  updateProfileImage(idUser:string,data:any):Observable<any>{
    return this.httpClient.put(`${this.url}/updatePic/${idUser}`,data);
  }

  obtenerUsuario(idUsuario:any){
    return this.httpClient.get(`${this.url}/${idUsuario}`)
  }

  addNotification(data:any):Observable<any>{
    return this.httpClient.put(`${this.url}/notifications/newPost`, data);
  }

  addNotificationCompany(data:any, idCompany:string):Observable<any>{
    return this.httpClient.put(`${this.url}/notifications/newPost/company/${idCompany}`, data)
  }

  getNotifications(idUser:String):Observable<any>{
    return this.httpClient.get(`${this.url}/notifications/${idUser}`);
  }

  readNotifications(idUser:String):Observable<any>{
    return this.httpClient.post(`${this.url}/notifications/read/${idUser}`, {})
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

  sendPhoto(cv: File, idUser: string){
    
    const fd = new FormData();
    fd.append('curriculums', cv);
    fd.append('titulo', "Este es el titulo")
    return this.httpClient.post(`http://localhost:3000/usuarios/CV/${idUser}`, fd);

  }

  obtainMyCurriculums(idUser: string){
    return this.httpClient.get(`http://localhost:3000/usuarios/CVinfo/${idUser}`);
  }

  isEmployeeLogged(){
    if(this.cookieService.get('tipo')=='0'){
      return true
    }
    return false
  }

  sendEmailVerification(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/verifyemail`, data);
  }
}
