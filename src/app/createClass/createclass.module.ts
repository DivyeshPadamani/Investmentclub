import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';

import { CreateClassComponent } from './createclass.component';
import {
  MatMenuModule, MatToolbarModule, MatButtonModule,
  MatButtonBase, MatCardModule, MatListModule,
  MatFormFieldModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateClassComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports: [
    CreateClassComponent
  ]
})
export class CreateClassModule {}
