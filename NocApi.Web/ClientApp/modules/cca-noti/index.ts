import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { CcaNotiService } from './cca-noti.service';
import { CcaNoti } from './cca-noti.component';

export * from './cca-noti.service';

@NgModule({
    exports: [CcaNoti],
    declarations: [CcaNoti],
    imports: [CommonModule],
    providers: [CcaNotiService]
})
export class CcaNotiModule {
}