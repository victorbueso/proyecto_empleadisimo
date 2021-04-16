import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  evento = new EventEmitter();
  sidebarEvent = new EventEmitter();
  postsVigente = new EventEmitter();
  postsVencido = new EventEmitter();
  postsHistorial = new EventEmitter();

  constructor() { }
}
