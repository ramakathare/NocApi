import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { Ng2BootstrapModule } from 'ngx-bootstrap';

import {
    APP_CONFIG,
    AppConfig
} from './config';

import {
    CcaHelper
} from '../modules/cca-helper';

import {
    StudentService,
    FileService,
    CcaBridgeService
} from './shared/services';

import {
    ConnectionResolver,
    UsersResolver,
    StudentsResolver
} from './shared/resolvers';

import { CcaHttpModule } from '../modules/cca-http';
import { CcaNotiModule } from '../modules/cca-noti';
import { CcaLoaderModule } from '../modules/cca-loader';
import { CcaGridModule } from '../modules/cca-grid';
import { CcaFileModule } from '../modules/cca-file';

import {
    CcaErrorHandler
} from './shared/other'

import {
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    CounterComponent,
    ModelComponent
} from './components';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ModelComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        CcaHttpModule, CcaNotiModule, CcaLoaderModule, CcaGridModule, CcaFileModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'model', component: ModelComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        CcaHelper,
        { provide: APP_CONFIG, useValue: AppConfig },
        StudentService, FileService, CcaBridgeService,
        ConnectionResolver,
        UsersResolver,
        StudentsResolver
    ]
})
export class AppModuleShared {
}
