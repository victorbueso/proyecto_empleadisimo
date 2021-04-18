import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { PageEvent } from '@angular/material/paginator'
import { faMapMarkerAlt, faUser, faUserAltSlash, faUsers, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck, faCalendarTimes} from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  faUser = faUser;
  faUserAltSlash = faUserAltSlash;
  faUserTimes = faUserTimes;
  faUsers = faUsers;
  faMapMarkerAlt =faMapMarkerAlt;
  faCalendarCheck = faCalendarCheck;
  faCalendarTimes = faCalendarTimes;


  // MatPaginator Inputs
  page_size : number = 10;
  page_number : number = 1;
  pageSizeOptions = [10,20,50,100];
  activeTab:NumberInput;

  filter = '';
  activeFilter = '';
  blockedFilter = '';
  deletedFilter= '';

  companies : any = [];
  activeCompanies : any = [];
  deletedCompanies : any = [];
  blockedCompanies : any = [];
  posts : any = [];
  selectedCompany : string ='';
  selectedPost : number = -1;
  nameCompany : string = '';


  handlePage(e:PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;
  }

  constructor(private usuariosService:UsuariosService,
    private publicacionesService:PublicacionesService,
    private modalService:NgbModal) { }

  ngOnInit(): void {
    this.activeTab = 0;
    this.usuariosService.getCompanies()
    .subscribe(res => {
      this.companies = res;
      for(let i in res){
        res[i]['publicaciones'] = [];
        if(res[i].estado == 'activo'){
          this.activeCompanies.push(res[i]);
        } else if(res[i].estado == 'bloqueado'){
          this.blockedCompanies.push(res[i]);
        } else{
          this.deletedCompanies.push(res[i]);
        }
      }
    }, error => console.log(error));
  }

  open(content:any, id:string){
    this.modalService.open(content, {centered:true})
    this.selectedCompany=id;
  }

  openXL(content:any, id:string){
    this.modalService.open(content, {size: 'lg'});
    this.publicacionesService.getPostCompany(id)
    .subscribe(result => {
      this.posts = result;
      this.companies.forEach((company: { _id: string; nombreCompleto : string}) => {
        if(company._id == id){
          this.nameCompany = company.nombreCompleto;
        }
      });
    }, err => console.log(err))

  }

  blockCompany(){
    let data = {estado : 'bloqueado'};
    this.usuariosService.updateStatusAdmin(data, this.selectedCompany)
    .subscribe( () => {
      this.ngOnInit();
      this.modalService.dismissAll()
    })
  }

  unblockCompany(id:string){
    let data = {estado : 'activo'};
    this.usuariosService.updateStatusAdmin(data, id)
    .subscribe( () => {
      this.ngOnInit();
      this.modalService.dismissAll()
    })
  }

  deleteCompany(){
    let data = {estado : 'eliminado'};
    this.usuariosService.updateStatusAdmin(data, this.selectedCompany)
    .subscribe( () => {
      this.ngOnInit();
      this.modalService.dismissAll()
    })
  }
}
