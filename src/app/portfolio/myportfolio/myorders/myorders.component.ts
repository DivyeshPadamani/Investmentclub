import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserService } from '../../../services/user.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CompanyService } from '../../../services/company.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyOrdersComponent implements AfterViewInit {

  displayedColumns = ['action', 'ticker', 'shares', 'price', 'expires'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private user: UserService, private order: OrderService) {
    this.dataSource = new MatTableDataSource(this.order.getOrders(() => {
      this.applyFilter(' ');
    }));
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      return data.company.ticker.indexOf(filter) !== -1 || data.company.companyName.indexOf(filter) !== -1;
    };
    setInterval(() => this.order.loadOrders(), 10000);
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
    this.order.loadOrders();
  }
}
