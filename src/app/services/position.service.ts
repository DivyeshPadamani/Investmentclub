import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import IUser from '../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import IPosition from '../interfaces/IPosition';

@Injectable()
export class PositionService {

    private API_ENDPOINT: string = window.location.protocol + '//' + window.location.hostname + ':8888/api/position';

    private positions: IPosition[] = [];
    private callbacks: any[] = [];
    constructor(private http: HttpClient, private cookie: CookieService) {
        this.loadPositions();
    }

    public loadPositions(): void {
        this.http.post(this.API_ENDPOINT, { token: this.cookie.get('token') }).subscribe((res: any) => {
            while (this.positions.length) {
                this.positions.pop();
            }
            res.forEach(position => {
                this.positions.push(position);
            });
            if (this.callbacks.length) {
                this.callbacks.forEach(cb => cb());
                this.callbacks = [];
            }
        });
    }

    public getPositions(callback): IPosition[] {
        if (callback) {
            this.callbacks.push(callback);
        }
        return this.positions;
    }
}
