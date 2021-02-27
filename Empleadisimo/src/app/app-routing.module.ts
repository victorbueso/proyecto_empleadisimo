import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './componentes/landing-page/landing-page.component';
import { FooterLinksComponent } from './componentes/footer-links/footer-links.component'
import { UpdateInfoComponent } from './componentes/update-info/update-info.component'

import { AuthenticationGuard } from './authentication.guard'

const routes: Routes = [
  { path: 'footer/:id' ,component: FooterLinksComponent },
  { path: '', component:LandingPageComponent },
  { path: 'update-info', component: UpdateInfoComponent },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m =>m.EmployeeModule), canActivate:[AuthenticationGuard] },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m =>m.CompanyModule), canActivate:[AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }