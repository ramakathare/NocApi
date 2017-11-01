import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CcaNotiService {
    constuctor() { }

    public notify = new Subject<any>();
    notifyObservable$ = this.notify.asObservable();

    private makenoti(type: string, body: string, subject?: string) {
        return {
            body: body,
            subject: subject,
            type: type
        }
    }
    public warning(body: string, subject?: string) {
        this.notify.next(this.makenoti("warning",body,subject));
    }
    public error(body: string, subject?: string) {
        this.notify.next(this.makenoti("error", body, subject));
    }
    public info(body: string, subject?: string) {
        this.notify.next(this.makenoti("info", body, subject));
    }
    public success(body: string, subject?: string) { 
        this.notify.next(this.makenoti("success", body, subject));
    }
    
   
}