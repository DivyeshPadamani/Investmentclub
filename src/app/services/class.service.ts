import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import IUser from '../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import ICompany from '../interfaces/ICompany';
import IClass from '../interfaces/IClass';
import { UserService } from './user.service';

@Injectable()
export class ClassService {

    private API_ENDPOINT: string
        = window.location.protocol + '//' + window.location.hostname + ':8888/api/class';

    constructor(private http: HttpClient, private cookie: CookieService, private user: UserService) {

    }

    public getMyClasses(): IClass[] {
        const classes = [];
        this.user.getUser().roles.forEach(role => {
            role.classes.forEach(classId => classes.push(classId));
        });
        return classes;
    }

    public getClassResolve(id: String): Observable<IClass> {
        return this.http.get(this.API_ENDPOINT + '/' + id).map(res => {
            return res as IClass;
        });
    }
}
