import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';

import { ICcaFileData } from './cca-file.component';

// todo: filters

@Directive({ selector: '[ccaFileDrop]' })
export class CcaFileDropDirective {
    @Input() public ccafileData: ICcaFileData;
    @Output() public fileOver: EventEmitter<any> = new EventEmitter();
    @Output() public onFileDrop: EventEmitter<File[]> = new EventEmitter<File[]>();

    protected element: ElementRef;

    public constructor(element: ElementRef) {
        this.element = element;
    }

    @HostListener('drop', ['$event'])
    public onDrop(event: any): void {
        let transfer = this._getTransfer(event);
        if (!transfer) {
            return;
        }
       
        this._preventAndStop(event);

        for (let file of transfer.files) {
            if (this.ccafileData.acceptCondition(file) && (this.ccafileData.files.length < this.ccafileData.maxFileCount))
            this.ccafileData.files.push({
                status: 0,
                name: file.name,
                size: (file.size * 0.001).toFixed(2),
                type: file.type,
                file: file,
                progress: 0
            });
        }
        console.log(this.ccafileData.files);
        this.fileOver.emit(false);
        this.onFileDrop.emit(transfer.files);
    }

    @HostListener('dragover', ['$event'])
    public onDragOver(event: any): void {

        let transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        
        
        this.fileOver.emit(true);
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(event: any): any {
        if ((this as any).element) {
            if (event.currentTarget === (this as any).element[0]) {
                return;
            }
        }
        this._preventAndStop(event);
        this.fileOver.emit(false);
    }

    protected _getTransfer(event: any): any {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    }

    protected _preventAndStop(event: any): any {
        event.preventDefault();
        event.stopPropagation();
    }

    protected _haveFiles(types: any): any {
        if (!types) {
            return false;
        }

        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        } else if (types.contains) {
            return types.contains('Files');
        } else {
            return false;
        }
    }

    /*
     _addOverClass(item:any):any {
     item.addOverClass();
     }
     _removeOverClass(item:any):any {
     item.removeOverClass();
     }*/
}