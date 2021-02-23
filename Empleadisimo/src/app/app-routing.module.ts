import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './componentes/landing-page/landing-page.component';
import { FooterLinksComponent } from './componentes/footer-links/footer-links.component'

const routes: Routes = [
  { path: 'footer/:id' ,component: FooterLinksComponent},
  { path: '', component:LandingPageComponent },
  {path:'employee', loadChildren: () => import('./employee/employee.module').then(m =>m.EmployeeModule)},
  {path:'company', loadChildren: () => import('./company/company.module').then(m =>m.CompanyModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }