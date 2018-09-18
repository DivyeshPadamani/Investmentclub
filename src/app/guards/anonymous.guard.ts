import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AnonymousGuard implements CanActivate {
    constructor(public user: UserService, public router: Router) { }
    canActivate(): boolean | Observable<boolean> {
        if (this.user.isLoaded()) {
            return !this.user.isLoggedIn();
        }
        return new Observable<boolean>((observer) => {
            const interval = setInterval(() => {
                if (this.user.isLoaded()) {
                    if (this.user.isLoggedIn()) {
                        this.router.navigate(['/my-portfolio']);
                    }
                    observer.next(!this.user.isLoggedIn());
                    observer.complete();
                    clearInterval(interval);
                }
            }, 100);
        });
    }
}
