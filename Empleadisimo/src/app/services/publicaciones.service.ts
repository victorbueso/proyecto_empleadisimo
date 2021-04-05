import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  private url = 'http://localhost:3000/publicaciones/'
  private company = `${this.url}posts/`
  constructor(private httpClient:HttpClient) { }

  getPosts():Observable<any>{
    return this.httpClient.get(this.url);
  }

  createPost(data: any): Observable<any> {
    return this.httpClient.post(this.url, data);
  }

  getPostCompany(id: string) {
    return this.httpClient.get(`${this.url}posts/${id}`);
  }

  updatePostUser(data: any): Observable<any> {
    return this.httpClient.put(this.url, data);
  }

  getAllInfoPost(id:string): Observable<any> {
    return this.httpClient.get(`${this.url}posts/getInfo/${id}`);
  }

  updateStatus(id:string, data:any):Observable<any>{
    return this.httpClient.post(`${this.url}post/updateStatus/${id}`, data);
  }

  updatePost(id:string, data:any):Observable<any>{
    return this.httpClient.put(`${this.url}post/update/${id}`, data);
  }

}