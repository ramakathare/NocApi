import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationError, NavigationCancel, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { Meta, Title, DOCUMENT, MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { isPlatformServer } from '@angular/common';
import { CcaBridgeService } from '../../shared/services';

import { CcaHttp } from '../../../modules/cca-http';
import { CcaLoaderService } from '../../../modules/cca-loader';
import { CcaNotiService } from '../../../modules/cca-noti';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

    // This will go at the END of your title for example "Home - Angular Universal..." <-- after the dash (-)
    private endPageTitle: string = 'Angular ASP.NET Core Starter';
    // If no Title is provided, we'll use a default one before the dash(-)
    private defaultPageTitle: string = 'My App';

    private hamStatus: boolean;

    private routerSub$: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private chttp: CcaHttp,
        private ccaloaderservice: CcaLoaderService,
        private ccanotiservice: CcaNotiService,
        private ccaBridgeService: CcaBridgeService
    ) {
        
    }

    ngOnInit() {
        //Similar to routechangestart
        this._registerNavigationStartEvents();

        this._registerNavigationErrorEvents();
        this._registerNavigationCancelEvents();

        //similar to routechangeend
        // Change "Title" on every navigationEnd event
        // Titles come from the data.title property on all Routes (see app.routes.ts)
        this._registerNavigationEndEvents();

        this._setInterceptor();
    }

    ngOnDestroy() {
        // Subscription clean-up
        this.routerSub$.unsubscribe();
    }

    private _setInterceptor() {
        var that = this;
        this.chttp.registerRequestInterceptor({
            beforeRequestAsync: function (url, method, data, headers) {
                return new Promise((resolve, reject) => {

                    if (!headers.find(p => p.key == "noLoader"))
                        that.ccaloaderservice.setLoader(true);
                    // do something 

                    // resolve with true to fully intercept request
                    // resolve with false to let the request continue
                    resolve(false);
                });
            }
        });

        this.chttp.registerResponseErrorInterceptor({
            afterResponseErrorAsync: function (response, url, method, data, headers) {
                return new Promise((resolve, reject) => {
                    if (!headers.find(p => p.key == "noLoader"))
                        that.ccaloaderservice.setLoader(false);

                    if (!headers.find(p => p.key == "noNoti")) {

                        response.statusText = response.statusText || "Unknown error has occured.";
                        that.ccanotiservice.error(response.statusText);
                        //setTimeout(() => {
                        //    that.ccanotiservice.warning(response.statusText);
                        //}, 500);
                        //setTimeout(() => {
                        //    that.ccanotiservice.success(response.statusText);
                        //}, 1000);
                        //setTimeout(() => {
                        //    that.ccanotiservice.info(response.statusText);
                        //}, 1500);
                    }

                    reject(response);
                });
            }
        });

        this.chttp.registerResponseInterceptor({
            afterResponseAsync: function (response, url, method, data, headers) {
                return new Promise((resolve, reject) => {
                    if (!headers.find(p => p.key == "noLoader"))
                        that.ccaloaderservice.setLoader(false);

                    resolve(response);
                });
            }
        });
    }

    private _registerNavigationStartEvents() {
        this.routerSub$ = this.router.events
            .filter(event => event instanceof NavigationStart)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                this.ccaloaderservice.setLoader(true);
            });
    }
    private _registerNavigationErrorEvents() {
        this.routerSub$ = this.router.events
            .filter(event => event instanceof NavigationError)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                this.ccaloaderservice.setLoader(false);
            });
    }

    private _registerNavigationCancelEvents() {
        this.routerSub$ = this.router.events
            .filter(event => event instanceof NavigationCancel)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                this.ccaloaderservice.setLoader(false);
            });
    }


    private _registerNavigationEndEvents() {
        this.routerSub$ = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                this._setMetaAndLinks(event);
                this.ccaloaderservice.setLoader(false);
            });
    }


    private _setMetaAndLinks(event:any) {

        // Set Title if available, otherwise leave the default Title
        const title = event['title']
            ? `${event['title']} - ${this.endPageTitle}`
            : `${this.defaultPageTitle} - ${this.endPageTitle}`;

        this.title.setTitle(title);

        const metaData = event['meta'] || [];
        const linksData = event['links'] || [];

        for (let i = 0; i < metaData.length; i++) {
            this.meta.updateTag(metaData[i]);
        }
    }
   
    //navToggle() {
    //    //this.hamStatus = !this.hamStatus;
    //    //this.ccaBridgeService.hamClicked(this.hamStatus); 
    //};

}

