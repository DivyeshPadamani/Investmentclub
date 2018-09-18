import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserService } from '../services/user.service';
import { ClassService } from '../services/class.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-class',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateClassComponent implements OnInit {

  private API_ENDPOINT: String = window.location.protocol + '//' + window.location.hostname + ':8888/api/class';

  createClassFormGroup: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required]),
  });
  constructor(
    public user: UserService, private classService: ClassService,
    private http: HttpClient, private router: Router, private cookie: CookieService) { }

  ngOnInit() {

  }

  submit() {
    if (this.createClassFormGroup.errors) {
      return;
    }
    this.http.post(this.API_ENDPOINT + '', { ...this.createClassFormGroup.value, token: this.cookie.get('token') }).subscribe(
      (res: any) => {
        console.log(res);
        this.user.loadUserdata(() => { this.router.navigate(['/my-portfolio']); });
      },
      (err: any) => {

      }
    );
  }
}
