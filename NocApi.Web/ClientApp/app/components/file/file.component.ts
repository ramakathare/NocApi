import {
    Component, OnInit, Output, ViewChild, ElementRef,
    // animation imports
    trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFile } from '../../models';
import { APP_CONFIG, IAppConfig } from '../../config';
import { FileService } from '../../shared/services';
import { ICcaFileData, ICcaFile } from '../../../modules/cca-file'

@Component({
    selector: 'files',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
    @ViewChild('formSubmitButton') formSubmitButton: ElementRef;
    fileData: ICcaFileData;

    // Use "constructor"s only for dependency injection
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig, private fileService: FileService
    ) {

    }
    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {
        let that = this;
        this.fileData = {
                uploadAll: {
                    button: false, url: new URL(`${this.config.apiEndpoint}/api/files/uploadFile`), callback: (response:any[]) => {
                        console.log(response);
                        if(!response.find(p => p.ok === false)) this.formSubmitButton.nativeElement.click();
                    }
                },
                upload: {
                    button: false, url: new URL(`${this.config.apiEndpoint}/api/files/uploadFile`), callback: (response) => { console.log(response); }
                },
                download: {
                    button: true, url: new URL(`${this.config.apiEndpoint}/api/files/downloadFile`), callback: (response) => { console.log(response);}
                },
                delete: {
                    button: true, url: new URL(`${this.config.apiEndpoint}/api/files/deleteFile`), callback: (response) => { console.log(response); }
                },
                chooseButton: true,
                //accept: ".txt",
                //acceptCondition: (file: File) => {
                //    return (file.type == `text/plain`) ? true : false;
                //},
                maxFileCount: 10
        };
        this.fileService.getFiles().subscribe(result => {
            for (let item of result) {
                this.fileData.files.push({
                    id: item.id,
                    name: item.name,
                    size: item.size,
                    status: 2,
                    type: item.type,
                    uniqueName: item.uniqueName,
                })
            }
        });
    }

    fakeSubmitClicked() {
        this.fileData.executeUploadAll();
    }
    submitClicked() {
        alert("Submit clicked.");
    }
}
