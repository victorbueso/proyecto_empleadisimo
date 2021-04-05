import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../employee/home/home.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { InformationComponent } from './information/information.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'update-info', component: UpdateInfoComponent},
  {path: 'information/:id', component: InformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
