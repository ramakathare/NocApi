import { Directive, ElementRef, Input, HostListener } from '@angular/core';

import { ICcaFileData } from './cca-file.component';

// todo: filters

@Directive({ selector: '[ccaFileInput]'})
export class CcaFileInputDirective {
    @Input() public ccafilesData: ICcaFileData;

  protected element:ElementRef;

  public constructor(element:ElementRef) {
    this.element = element;
  }

  //public getOptions():any {
  //  return this.uploader.options;
  //}

  //public getFilters():any {
  //  return void 0;
  //}

  public isEmptyAfterSelection():boolean {
    return !!this.element.nativeElement.attributes.multiple;
  }

  @HostListener('change')
  public onChange():any {
      let files = this.element.nativeElement.files as File[];
      for (let file of files) {
          if (this.ccafilesData.acceptCondition(file) && (this.ccafilesData.files.length < this.ccafilesData.maxFileCount))
          this.ccafilesData.files.push({
            status: 0,
            name: file.name,
            size: (file.size * 0.001).toFixed(2),
            type: file.type,
            file: file,
            progress: 0
        });  
    }
    
    if (this.isEmptyAfterSelection()) {
      // todo
      this.element.nativeElement.value = '';
      /*this.element.nativeElement
       .replaceWith(this.element = this.element.nativeElement.clone(true)); // IE fix*/
    }
  }
}