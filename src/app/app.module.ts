import { PaisesService } from './dashboard/paises.service';
import { DataOrganizeService } from './dashboard/data-organize.service';
import { CepService } from './user-form/cep.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './/app-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormService } from './user-form/user-form.service';
import { DashboardService } from './dashboard/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UserFormService,
    DashboardService,
    CepService,
    DataOrganizeService,
    PaisesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
