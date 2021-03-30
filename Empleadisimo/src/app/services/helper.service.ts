import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  evento = new EventEmitter();
  sidebarEvent = new EventEmitter();

  constructor() { }
}
