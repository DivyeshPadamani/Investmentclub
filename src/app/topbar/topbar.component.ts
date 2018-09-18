import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserService } from '../services/user.service';
import { ClassService } from '../services/class.service';

declare let TradingView: any;

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(public user: UserService, private classesService: ClassService) { }

  ngOnInit() {

  }

  logout() {
    this.user.logout();
  }

  getClasses() {
    return this.classesService.getMyClasses();
  }
}
