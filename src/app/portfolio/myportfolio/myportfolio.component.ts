import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserService } from '../../services/user.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-myportfolio',
  templateUrl: './myportfolio.component.html',
  styleUrls: ['./myportfolio.component.css']
})
export class MyPortfolioComponent implements AfterViewInit {

  constructor(public user: UserService, private company: CompanyService) {

  }

  ngAfterViewInit() {

  }
}
