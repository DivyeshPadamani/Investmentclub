import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatMenuModule, MatToolbarModule,
  MatButtonModule, MatButtonBase,
  MatCardModule, MatTableModule,
  MatPaginatorModule, MatSortModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyPositionsComponent } from './mypositions.component';

@NgModule({
  declarations: [
    MyPositionsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MyPositionsComponent
  ]
})
export class MyPositionsModule { }
