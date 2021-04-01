import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator'
import { faUser, faUserAltSlash, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  faUser = faUser;
  faUserAltSlash = faUserAltSlash;
  faUserTimes = faUserTimes;

  // MatPaginator Inputs
  page_size : number = 10;
  page_number : number = 1;
  pageSizeOptions = [10,20,50,100];
  activeTab:NumberInput;
  filter = '';
  activeFilter = '';
  blockedFilter = '';
  deletedFilter= '';

  employees : any = [];
  activeEmployees : any = [];
  deletedEmployees : any = [];
  blockedEmployees : any = [];
  selectedEmployee : string ='';

  handlePage(e:PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;
  }

  constructor(private usuariosService:UsuariosService,
    private modalService:NgbModal) { }

  ngOnInit(): void {
    this.activeTab = 0;
    this.usuariosService.getEmployees()
    .subscribe(res => {
      this.employees = res;
      for(let i in res){
        if(res[i].estado == 'activo'){
          this.activeEmployees.push(res[i]);
        } else if(res[i].estado == 'bloqueado'){
          this.blockedEmployees.push(res[i]);
        } else{
          this.deletedEmployees.push(res[i]);
        }
      }
    }, error => console.log(error));
  }

  open(content:any, id:string){
    this.modalService.open(content, {centered:true})
    this.selectedEmployee=id;
  }

  blockEmployee(){
    let data = {estado : 'bloqueado'};
    this.usuariosService.updateStatusAdmin(data, this.selectedEmployee)
    .subscribe( () => {
      this.ngOnInit();
      this.modalService.dismissAll()
    })
  }

  unblockEmployee(id:string){
    let data = {estado : 'activo'};
    this.usuariosService.updateStatusAdmin(data, id)
    .subscribe( () => {
      this.ngOnInit();
      this.modalService.dismissAll()
    })
  }

  deleteEmployee(){
    let data = {estado : 'eliminado'};
    this.usuariosService.updateStatusAdmin(data, this.selectedEmployee)
    .subscribe( () => {
      this.ngOnInit();
      this.modalService.dismissAll()
    })
  }

}
