import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import IUser from '../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import ICompany from '../interfaces/ICompany';

@Injectable()
export class CompanyService {

    private API_ENDPOINT: string
    = window.location.protocol + '//' + window.location.hostname + ':8888/api/company?start=0&count=4000&filter=';

    private companies: ICompany[] = [];
    private callbacks: any[] = [];
    constructor(private http: HttpClient, private cookie: CookieService) {

    }

    public loadCompanies(filter: string): void {
        if (!filter || filter.length === 0 || filter.trim().length === 0) {
            return;
        }
        this.http.get(this.API_ENDPOINT + filter.trim()).subscribe((res: any) => {
            while (this.companies.length) {
                this.companies.pop();
            }
            res.docs.forEach(company => {
                this.companies.push(company);
            });
            if (this.callbacks.length) {
                this.callbacks.forEach(cb => cb());
                this.callbacks = [];
            }
        });
    }

    public getCompanies(callback): ICompany[] {
        if (callback) {
            this.callbacks.push(callback);
        }
        return this.companies;
    }
}
