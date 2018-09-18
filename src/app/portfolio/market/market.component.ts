import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserService } from '../../services/user.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { CompanyService } from '../../services/company.service';
import ICompany from '../../interfaces/ICompany';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PlaceOrderDialogComponent } from './placeorder/placeorder.dialog';

declare let TradingView: any;

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements AfterViewInit {

  displayedColumns = ['ticker', 'name', 'share price', 'open', '% change today', 'low', 'high', 'view'];
  dataSource: MatTableDataSource<any>;

  filterValue: string;
  selectedCompany: ICompany = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private user: UserService, private dialog: MatDialog, private company: CompanyService, private sanitizer: DomSanitizer) {
    this.dataSource = new MatTableDataSource(this.company.getCompanies(() => {
      this.applyFilter(' ');
    }));
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      return data.ticker.toLowerCase().indexOf(filter) !== -1 || data.companyName.toLowerCase().indexOf(filter) !== -1;
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.company.loadCompanies(this.dataSource.filter);
  }

  buy() {
    this.openDialog();
  }

  sell() {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(PlaceOrderDialogComponent, {
      height: '600px',
      data: this.selectedCompany
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openMarket(company: ICompany): void {
    this.selectedCompany = company;
    this.selectedCompany.news = JSON.parse(this.selectedCompany.news + '');
    const widget = new TradingView.widget({
      'container_id': 'trading-view',
      'autosize': true,
      'symbol': company.market + ':' + company.ticker,
      'interval': 'D',
      'timezone': 'Etc/UTC',
      'theme': 'Light',
      'style': '1',
      'locale': 'en',
      'toolbar_bg': '#f1f3f6',
      'enable_publishing': false,
      'allow_symbol_change': true,
      'hideideas': true
    });
  }

  getMarketUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl((this.selectedCompany) ? this.selectedCompany.nasdaqLink + '' : '');
  }
}
