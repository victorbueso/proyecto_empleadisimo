import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminsComponent } from './admins/admins.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from  '@fortawesome/angular-fontawesome';
import { EmployeesComponent } from './employees/employees.component';
import { CompaniesComponent } from './companies/companies.component';
import { HomeComponent } from './home/home.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { MatTabsModule } from "@angular/material/tabs";
import { MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator'
import { CustomMatPaginatorIntl } from './paginator-admin';
import { FilterEmployeesPipe } from './pipes/filter-employees.pipe';
import { FilterCompaniesPipe } from './pipes/filter-companies.pipe';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [ AdminsComponent,
    SidebarComponent,
    EmployeesComponent,
    CompaniesComponent,
    HomeComponent,
    DashboardComponent,
    PaginationPipe,
    FilterEmployeesPipe,
    FilterCompaniesPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatTabsModule,
    MatPaginatorModule,
    HighchartsChartModule
  ],
  providers:[
    {
      provide: MatPaginatorIntl,
      useClass : CustomMatPaginatorIntl
    }
  ]
})
export class AdminModule { }
