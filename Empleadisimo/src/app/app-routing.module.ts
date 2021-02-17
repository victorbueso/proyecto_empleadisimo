import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './componentes/landing-page/landing-page.component';
import { FooterLinksComponent } from './componentes/footer-links/footer-links.component';

const routes: Routes = [
  { path: 'footer/:id' ,component: FooterLinksComponent},
  { path: '', component:LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }