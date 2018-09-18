import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FooterComponent } from './footer.component';
import { MatMenuModule, MatToolbarModule, MatButtonModule, MatButtonBase } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule {}
