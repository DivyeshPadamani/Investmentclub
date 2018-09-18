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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  iAmA: String;
  private API_ENDPOINT: String = window.location.protocol + '//' + window.location.hostname + ':8888/api/login';

  registerFormGroup: FormGroup = new FormGroup({
    'firstName': new FormControl('', [Validators.required]),
    'classCode': new FormControl('', [Validators.required]),
    'lastName': new FormControl('', [Validators.required]),
    'birthday': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required]),
    'confirmPassword': new FormControl('', [Validators.required])
  });

  constructor(
    private http: HttpClient, private router: Router,
    private cookie: CookieService, private user: UserService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  submit() {
    if (this.registerFormGroup.errors) {
      return;
    }
    this.http.post(this.API_ENDPOINT + '/signup', { ...this.registerFormGroup.value, type: this.iAmA }).subscribe(
      (res: any) => {
        if (res.success) {
          const token = res.token;
          this.cookie.set('token', token);
          this.user.loadUserdata(() => { this.router.navigate(['/my-portfolio']); });
        }
      },
      (err: any) => {
        this.snackbar.open('Registration failed: ' + err.error.message, null, {
          duration: 3000,
        });
      }
    );
  }
}
