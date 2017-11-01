import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CcaFile } from './cca-file.component';

import { CcaFileInputDirective } from './cca-fileinput.directive'
import { CcaFileDropDirective } from './cca-filedrop.directive'
import { NewFilePipe } from './cca-newfile.pipe'

export * from './cca-file.component';

@NgModule({
    exports: [CcaFile, CcaFileInputDirective, CcaFileDropDirective, NewFilePipe],
    declarations: [CcaFile, CcaFileInputDirective, CcaFileDropDirective, NewFilePipe],
    imports: [CommonModule, FormsModule],
    //providers: []
})
export class CcaFileModule {
}
