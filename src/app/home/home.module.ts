import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { ContentModule } from '../content/content.module';
import { SideBarModule } from '../sidebar/sidebar.module';
import { TopBarModule } from '../topbar/topbar.module';

import { MatSidenavModule } from '@angular/material';
import { FooterModule } from '../footer/footer.module';
import { LandingModule } from '../landing/landing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    ContentModule,
    SideBarModule,
    TopBarModule,
    FooterModule,
    MatSidenavModule
  ],
  providers: [

  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
