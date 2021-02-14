import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './componentes/landing-page/landing-page.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FirstBlockComponent } from './componentes/first-block/first-block.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { SliderComponent } from './componentes/slider/slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BenefitsComponent } from './componentes/benefits/benefits.component';
import { ProsComponent } from './componentes/pros/pros.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    FirstBlockComponent,
    FooterComponent,
    SliderComponent,
    BenefitsComponent,
    ProsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
