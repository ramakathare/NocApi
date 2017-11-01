import { Injectable,Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CcaBridgeService {


    constructor() {
    }

    private navMenuSubject = new Subject<boolean>();
    navMenuObservable$ = this.navMenuSubject.asObservable();

    public hamClicked(show:boolean) {
        this.navMenuSubject.next(show);
    }
}