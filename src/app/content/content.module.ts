import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content.component';
import { LoginComponent } from '../account/login/login.component';
import { LoginModule } from '../account/login/login.module';
import { RegisterComponent } from '../account/register/register.component';
import { RegisterModule } from '../account/register/register.module';
import { MyPortfolioComponent } from '../portfolio/myportfolio/myportfolio.component';
import { MyPortfolioModule } from '../portfolio/myportfolio/myportfolio.module';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { AnonymousGuard } from '../guards/anonymous.guard';
import { MarketComponent } from '../portfolio/market/market.component';
import { MarketModule } from '../portfolio/market/market.module';
import { LandingComponent } from '../landing/landing.component';
import { LandingModule } from '../landing/landing.module';
import { CreateClassModule } from '../createClass/createclass.module';
import { CreateClassComponent } from '../createClass/createclass.component';
import { ClassModule } from '../class/class.module';
import { ClassComponent } from '../class/class.component';
import { ClassResolve } from '../class/class.resolver';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
  { path: 'my-portfolio', component: MyPortfolioComponent, canActivate: [AuthenticationGuard] },
  { path: 'market', component: MarketComponent, canActivate: [AuthenticationGuard] },
  { path: 'create-class', component: CreateClassComponent, canActivate: [AuthenticationGuard] },
  { path: 'class/:id', component: ClassComponent, canActivate: [AuthenticationGuard], resolve: { class: ClassResolve } },
  { path: '', component: LandingComponent  }
];

@NgModule({
  declarations: [
    ContentComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    LoginModule,
    RegisterModule,
    MyPortfolioModule,
    MarketModule,
    LandingModule,
    CreateClassModule,
    ClassModule
  ],
  exports: [
    ContentComponent
  ],
  providers: [
    AuthenticationGuard,
    AnonymousGuard,
    ClassResolve
  ]
})
export class ContentModule { }
