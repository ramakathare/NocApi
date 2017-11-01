import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { IStudent } from '../../models';
import { StudentService } from '../services';

@Injectable()
export class StudentsResolver implements Resolve<IStudent[]> {

    constructor(private studentservice: StudentService, private router:Router) { }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('StudentsResolver. Resolving...');

        return this.studentservice.getStudents();
    }
}
