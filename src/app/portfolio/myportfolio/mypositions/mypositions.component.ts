import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserService } from '../../../services/user.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CompanyService } from '../../../services/company.service';
import { PositionService } from '../../../services/position.service';

@Component({
  selector: 'app-mypositions',
  templateUrl: './mypositions.component.html',
  styleUrls: ['./mypositions.component.css']
})
export class MyPositionsComponent implements AfterViewInit {

  displayedColumns = ['ticker', 'name', 'shares', 'value', '% change today', 'change today', 'share price'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private user: UserService, private position: PositionService) {
    this.dataSource = new MatTableDataSource(this.position.getPositions(() => {
      this.applyFilter(' ');
    }));
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      return data.company.ticker.indexOf(filter) !== -1 || data.company.companyName.indexOf(filter) !== -1;
    };
    setInterval(() => this.position.loadPositions(), 10000);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  refresh(): void {
    this.position.loadPositions();
  }
}
