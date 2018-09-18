import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import IUser from '../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import IOrder from '../interfaces/IOrder';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class OrderService {

    private API_ENDPOINT: string = window.location.protocol + '//' + window.location.hostname + ':8888/api/order';

    private orders: IOrder[] = [];
    private callbacks: any[] = [];
    constructor(private http: HttpClient, private cookie: CookieService, private snackBar: MatSnackBar) {
        this.loadOrders();
    }

    public loadOrders(): void {
        this.http.post(this.API_ENDPOINT, { token: this.cookie.get('token') }).subscribe((res: any) => {
            while (this.orders.length) {
                this.orders.pop();
            }
            res.forEach(order => {
                this.orders.push(order);
            });
            if (this.callbacks.length) {
                this.callbacks.forEach(cb => cb());
                this.callbacks = [];
            }
        });
    }

    public sendOrder(order: IOrder) {
        this.http.post(this.API_ENDPOINT + '/place', { ...order, token: this.cookie.get('token') }).subscribe((res: any) => {
            this.snackBar.open('Placed order!', null, {
                duration: 3000
            });
        });
    }

    public getOrders(callback): IOrder[] {
        if (callback) {
            this.callbacks.push(callback);
        }
        return this.orders;
    }
}
