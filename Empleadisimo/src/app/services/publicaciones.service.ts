import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  private url = 'http://localhost:3000/publicaciones/'
  constructor(private httpClient:HttpClient) { }

  getPosts():Observable<any>{
    return this.httpClient.get(this.url);
  }

  createPost(data: any): Observable<any> {
    return this.httpClient.post(this.url, data);
  }
}
