import {
    Component, Input, OnInit, OnDestroy,
    // animation imports
    trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { CcaNotiService } from './cca-noti.service';

const DEFAULT_TIMEOUT = 3000;

@Component({
    selector: 'cca-noti-indicator',
    templateUrl: './cca-noti.component.html',
    styleUrls: ['./cca-noti.component.css'],
    animations: [
        // Animation example
        // Triggered in the ngFor with [@flyInOut]
        trigger('flyInOut', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(+100%)' }),
                animate('0.2s ease-in')
            ]),
            transition('* => void', [
                animate(200, style({ transform: 'translateY(+100%)' }))
            ])
        ])
    ]
})
export class CcaNoti implements OnInit, OnDestroy {

    subscription: Subscription;

    @Input()
    timeout: number;

    public notifications: any[];

    constructor(private ccanotiservice: CcaNotiService) {
        this.notifications = [];
    }

    ngOnInit() {
        let that = this;
        this.subscription = this.ccanotiservice.notifyObservable$.subscribe((noti) => {
            that.checkin(noti);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    checkin(noti) {
        this.notifications.push(noti);
        noti.timeout = this.timeout || DEFAULT_TIMEOUT;
        noti.timer = setInterval(() => {
            if (!noti.mouseover) noti.timeout = noti.timeout - 100;
            if (noti.timeout <= 0) {
                clearInterval(noti.timer);
                this.removenoti(noti);
            }
        }, 100)
    }
    notificationClicked(noti) {
        noti.timer == 0;
    }
    removenoti(noti:any) {
        let index: number = this.notifications.indexOf(noti);
        if (index !== -1) {
            this.notifications.splice(index, 1);
        } 
    }
}