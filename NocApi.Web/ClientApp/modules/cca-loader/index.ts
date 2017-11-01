import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CcaLoaderService } from './cca-loader.service';
import { CcaLoader } from './cca-loader.component';

export * from './cca-loader.service';

@NgModule({
    exports: [CcaLoader],
    declarations: [CcaLoader],
    imports: [CommonModule],
    providers: [CcaLoaderService]
})
export class CcaLoaderModule {
}