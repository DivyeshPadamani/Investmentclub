import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatMenuModule, MatToolbarModule,
  MatButtonModule, MatButtonBase,
  MatCardModule, MatTableModule,
  MatPaginatorModule, MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule, MatDialogModule, MatRadioModule, MatDatepickerModule, MatCheckboxModule
} from '@angular/material';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarketComponent } from './market.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceOrderDialogComponent } from './placeorder/placeorder.dialog';

@NgModule({
  declarations: [
    MarketComponent,
    PlaceOrderDialogComponent
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
    MatChipsModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  exports: [
    MarketComponent,
    PlaceOrderDialogComponent
  ],
  entryComponents: [
    PlaceOrderDialogComponent
  ]
})
export class MarketModule { }
