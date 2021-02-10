import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isCollapsed = true;
  active=1;
  
  constructor( private modalService:NgbModal) { }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  ngOnInit(): void {
  }

}
