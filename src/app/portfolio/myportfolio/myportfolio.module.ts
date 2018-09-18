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
import { MyPortfolioComponent } from './myportfolio.component';
import { FormsModule } from '@angular/forms';
import { MyPositionsModule } from './mypositions/mypositions.module';
import { MyOrdersModule } from './myorders/myorders.module';

@NgModule({
  declarations: [
    MyPortfolioComponent
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
    MatInputModule,
    MyPositionsModule,
    MyOrdersModule
  ],
  exports: [
    MyPortfolioComponent
  ]
})
export class MyPortfolioModule { }
