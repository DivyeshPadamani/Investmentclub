import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ClassComponent } from './class.component';
import {
  MatMenuModule, MatToolbarModule, MatButtonModule,
  MatButtonBase, MatCardModule, MatListModule,
  MatIconModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    ClassComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSnackBarModule,
    OrderModule
  ],
  exports: [
    ClassComponent
  ]
})
export class ClassModule {}
