import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private API_ENDPOINT: String = window.location.protocol + '//' + window.location.hostname + ':8888/api/login';

  loginFormGroup: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required])
  });

  constructor(    
    private http: HttpClient, private router: Router,
    private cookie: CookieService, private user: UserService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  submit() {
    if (this.loginFormGroup.errors) {
      return;
    }
    this.http.post(this.API_ENDPOINT + '', this.loginFormGroup.value).subscribe(
      (res: any) => {
        if (res.success) {
          const token = res.token;
          this.cookie.set('token', token);
          this.user.loadUserdata(() => { this.router.navigate(['/my-portfolio']); });
        }
      },
      (err: any) => {
        this.snackbar.open('Login failed: ' + err.error.message, null, {
          duration: 3000,
        });
      }
    );
  }
}
