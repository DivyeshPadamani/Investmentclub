import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TopBarComponent } from './topbar.component';
import { MatMenuModule, MatToolbarModule, MatButtonModule, MatButtonBase } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TopBarComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    TopBarComponent
  ]
})
export class TopBarModule {}
