import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserService } from '../services/user.service';
import { ClassService } from '../services/class.service';
import { Router, ActivatedRoute } from '@angular/router';
import IClass from '../interfaces/IClass';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  private API_ENDPOINT: String = window.location.protocol + '//' + window.location.hostname + ':8888/api/class';

  public class: IClass;
  postFormGroup: FormGroup = new FormGroup({
    'body': new FormControl('', [Validators.required]),
    'emailed': new FormControl(false, [])
  });

  constructor(
    public user: UserService, private cookies: CookieService,
    private classService: ClassService, private route: ActivatedRoute,
    private http: HttpClient, private snackbar: MatSnackBar) {
    this.route.params.subscribe(params => {
      this.class = this.route.snapshot.data.class;
    });
  }

  ngOnInit() {

  }

  cleanTime(date) {
    return new Date(date.toString()).toLocaleString();
  }

  submit() {
    if (this.postFormGroup.errors) {
      return;
    }
    this.http.post(this.API_ENDPOINT + '/post/' + this.class._id,
      {
        ...this.postFormGroup.value, token: this.cookies.get('token')
      }
    ).subscribe(res => {
      this.snackbar.open('Submitted post!', null, {
        duration: 3000
      });
    });
    this.postFormGroup.reset();
  }
}
