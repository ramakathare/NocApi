import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class UsersResolver implements Resolve<any[]> {

    constructor(private router:Router) { }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('UsersResolver. Resolving...');

        return [];

        //return new Promise((resolve, reject) => {
        //    this.userservice.getUsers().subscribe(p => {
        //        resolve(p);
        //    }, q => {
        //        this.router.navigate(["url"]);
        //        reject(q);
        //    });
        //});
    }
}
