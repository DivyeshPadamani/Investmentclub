import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { CompanyService } from './services/company.service';
import { OrderService } from './services/order.service';
import { PositionService } from './services/position.service';
import { ClassService } from './services/class.service';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    HomeModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    CookieService,
    UserService,
    CompanyService,
    OrderService,
    PositionService,
    ClassService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
