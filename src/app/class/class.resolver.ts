import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import IClass from '../interfaces/IClass';
import { ClassService } from '../services/class.service';

@Injectable()
export class ClassResolve implements Resolve<IClass> {

  constructor(private classService: ClassService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.classService.getClassResolve(route.paramMap.get('id'));
  }
}
