import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url = "http://localhost:3000/usuarios";
  idChat = ""; 

  constructor(
    private httpClient: HttpClient
  ) {}

  messageSeen(idUser : string, user : any) : Observable<any>{
    return this.httpClient.put(`http://localhost:3000/usuarios/messageSeen/${idUser}`, user);
  }

}
