import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register.component';
import {
  MatCardModule, MatButtonModule,
  MatFormFieldModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MatSnackBarModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule
  ],
  providers: [
  ],
  exports: [
    RegisterComponent,
  ]
})
export class RegisterModule { }
