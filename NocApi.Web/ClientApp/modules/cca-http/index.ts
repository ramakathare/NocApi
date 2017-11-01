import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CcaHttp } from './cca-http.service';

export * from './cookie-store.service';
export * from './cca-http.service';
export * from './http-header.model';
export * from './request-interceptor.interface';
export * from './response-interceptor.interface';
export * from './responseError-interceptor.interface';

@NgModule({
    exports: [],
    imports: [HttpModule],
    providers: [CcaHttp]
})
export class CcaHttpModule {
    /** @deprecated */
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CcaHttpModule,
            providers: []
        };
    }
}