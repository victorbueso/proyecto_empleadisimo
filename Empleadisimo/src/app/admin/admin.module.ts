import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminsComponent } from './admins/admins.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from  '@fortawesome/angular-fontawesome';
import { EmployeesComponent } from './employees/employees.component';
import { CompaniesComponent } from './companies/companies.component';
import { HomeComponent } from './home/home.component'


@NgModule({
  declarations: [AdminsComponent, SidebarComponent, EmployeesComponent, CompaniesComponent, HomeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule
  ]
})
export class AdminModule { }
