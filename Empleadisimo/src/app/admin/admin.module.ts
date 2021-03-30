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
import { DashboardComponent } from './dashboard/dashboard.component'



@NgModule({
  declarations: [AdminsComponent, SidebarComponent, EmployeesComponent, CompaniesComponent, HomeComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class AdminModule { }
