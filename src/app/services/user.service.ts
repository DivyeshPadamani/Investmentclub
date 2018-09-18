import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import IUser from '../interfaces/IUser';
import { HttpClient } from '@angular/common/http';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
@Injectable()
export class UserService {

    private API_ENDPOINT: string = window.location.protocol + '//' + window.location.hostname + ':8888/api/user';

    private loggedIn: Boolean;
    private user: IUser;
    private myValue: Number = 0;
    private loaded: Boolean = false;

    constructor(private http: HttpClient, private cookie: CookieService) {
        if (window['_userObject']) {
            this.loggedIn = window['_userObject'].loggedIn;
            if (this.loggedIn) {
                this.user = window['_userObject'].user;
            }
            this.loaded = true;
        }
        if (this.loggedIn) {
            this.loadPortfolioValue();
        }
        setInterval(() => {
            if (this.loggedIn) {
                this.loadPortfolioValue();
            }
        }, 5000);

    }

    public loadUserdata(callback): void {
        this.http.post(this.API_ENDPOINT, { token: this.cookie.get('token') }).subscribe((res: any) => {
            this.loggedIn = res.loggedIn;
            if (this.loggedIn) {
                this.user = res.user;
            }
            this.loaded = true;
            if (callback) {
                callback();
            }
        });
    }

    public isLoaded(): Boolean {
        return this.loaded;
    }

    public loadPortfolioValue(): void {
        this.http.post(this.API_ENDPOINT + '/value', { token: this.cookie.get('token') }).subscribe((res: any) => {
            this.user.cash = res.cash;
            this.myValue = res.value;
        });
    }

    public async logout() {
        this.http.post(this.API_ENDPOINT + '/logout', { token: this.cookie.get('token') }).subscribe((res) => {
            window.location.reload();
        });
    }

    public isLoggedIn(): Boolean {
        return this.loggedIn;
    }

    public getUser(): IUser {
        return this.user;
    }

    public getValue(): Number {
        return this.myValue;
    }
}
