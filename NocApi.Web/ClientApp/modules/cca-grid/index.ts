import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CcaGridService } from './cca-grid.service';
import { CcaGrid } from './cca-grid.component';
import { NotHiddenPipe } from './cca-grid-nothidden.pipe';
import { KeysPipe } from './cca-grid-keys.pipe';

export * from './cca-grid.service';
export * from './cca-grid.component';
export * from './cca-grid-keys.pipe';
export * from './cca-grid-nothidden.pipe';


@NgModule({
    exports: [CcaGrid, NotHiddenPipe, KeysPipe],
    declarations: [CcaGrid, NotHiddenPipe, KeysPipe],
    imports: [CommonModule,FormsModule],
    providers: [CcaGridService]
})
export class CcaGridModule {
}
