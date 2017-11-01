import {
    Component, Input, OnInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import {Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { CcaHttp } from '../cca-http'
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

export class ICcaFile {
    status: -2 | -1 | 0 | 1 | 2;
    name: string;
    size: string;
    type: string;
    uniqueName?: string;
    id?: number;
    file?: File;
    progress?: number;
}

export class ICcaFileData {
    //type?: "multiple" | "single";
    files?: ICcaFile[];
    dropperClassName?: string;
    fileOverClassName?: string;
    inputClassName?: string;
    uploadAll?: ICcaFileAction;
    upload?: ICcaFileAction;
    download?: ICcaFileAction;
    delete?: ICcaFileAction;
    //maxLength?: number;
    executeUploadAll?: () => void;
    executeUpload?: (fileobj: ICcaFile, url: URL, temp?: ICcaTemp) => void;
    executeDownload?: (fileobj: ICcaFile) => void;
    executeDelete?: (fileobj: ICcaFile) => void;
    chooseButton?: boolean;
    accept?: string;
    acceptCondition?: (file: File) => boolean;
    maxFileCount?: number;
}

export class ICcaTemp {
    i: number;
    responses: any[];
    callback: (i: number,response:any[]) => void
}
export class ICcaFileAction {
    button: boolean;
    url?: URL;
    callback?: (response: any) => void;
}

@Component({
    selector: 'cca-file',
    templateUrl: './cca-file.component.html',
    styleUrls: ['./cca-file.component.css']
})
export class CcaFile implements OnInit, OnDestroy {
    @Input("fileData") data: ICcaFileData;
    @ViewChild('fileInput') fileInput: ElementRef;
    disableUploadAll: boolean;

    fileStatus: any = {
        "-2": "Deleted",
        "-1": "Delete",
        "0": "New",
        "1": "Upload",
        "2": "Uploaded"
    }

    fileOver: boolean;

    constructor(private ccaHttp: CcaHttp) {
        this.disableUploadAll = false;
    }
    ngOnInit() {
        this.normalizeGridData(this.data);
    }
    ngOnDestroy() {

    }
    fileOvered(result:any){
        this.fileOver = result;
    }
    normalizeGridData(data: ICcaFileData) {
        var that = this;

        //data.type = data.type || "multiple";
        data.files = data.files || [];
        data.dropperClassName = data.dropperClassName || "fileDropper";
        data.inputClassName = data.inputClassName || "fileInput";
        data.fileOverClassName = data.fileOverClassName || "fileOver";

        data.upload = data.upload || { button: false};
        data.uploadAll = data.uploadAll || { button: false};
        data.delete = data.delete || { button: false};
        data.download = data.download || { button: false };
        //data.maxLength = data.maxLength || 10;
        if (data.chooseButton == null) data.chooseButton = true;
        if (data.maxFileCount == null) data.maxFileCount = 99999;

        data.accept = data.accept || "*";

        data.acceptCondition = data.acceptCondition || function (file: File) { return true; };

        data.executeDelete = (fileobj: ICcaFile) => {
            var that = this;
            if (fileobj.status >= 0) {
                if (fileobj.status == 2) {
                    fileobj.status = -1;
                    that.ccaHttp.postObservable(data.delete.url.href, fileobj)
                        .subscribe(response => {
                            fileobj.status == -2;
                            that.removeFileFromData(fileobj);
                            if (data.delete.callback) data.delete.callback(response);
                        },
                        error => { fileobj.status == 2; console.log(error); }
                        )
                } else {
                    fileobj.status = -1;
                    that.removeFileFromData(fileobj);
                }
            }
        }
        data.executeDownload = (fileobj: ICcaFile) => {

            let headers = new Headers()

            let options = new RequestOptions();
            options.responseType = ResponseContentType.Blob;

            that.ccaHttp.postObservable(data.download.url.href, fileobj, options)
                .subscribe(
                response => {
                    this.downloadFile(fileobj, response);
                    if (data.download.callback) data.download.callback(response);
                },
                error => console.log(error)
                )
        }

        data.executeUpload = (fileobj: ICcaFile, url: URL, temp?: ICcaTemp) => {
            fileobj.status = 1;
            this.executeUploadObservable(fileobj, url)
                .subscribe(
                response => {
                    if (response.data) {
                        if (response.data.length > 0) {
                            var fileobjresponse = response.data[0];
                            fileobj.status = 2;
                            fileobj.id = fileobjresponse.id;
                            fileobj.uniqueName = fileobjresponse.uniqueName;
                        }
                    }
                    if (data.upload.callback) data.upload.callback(response);
                    if (temp) {
                        temp.responses.push(response);
                        temp.i--; temp.callback(temp.i, temp.responses);
                    }
                },
                error => {
                    fileobj.status = 0;
                    if (temp) {
                        temp.responses.push(error);
                        temp.i--; temp.callback(temp.i, temp.responses);
                    }
                })
            data.files.length = 0;
        }
        data.executeUploadAll = () => {
            var that = this;
            if (data.uploadAll.url) {
                let temp: ICcaTemp = {
                    i : 0,
                    responses : [],
                    callback: (i: number, responses: any[]) => {
                        if (i == 0) {
                            if (data.uploadAll.callback) data.uploadAll.callback(responses); 
                        }
                    }
                }
                for (let fileobj of data.files.filter(p => p.status == 0)) {
                    temp.i++;
                    data.executeUpload(fileobj, data.uploadAll.url, temp);
                }
            } else {
                throw "Upload all url is not defined";
            }
        }
    }
    executeUploadObservable(fileobj: ICcaFile, url: URL): Observable<any> {
        

        var url = url || this.data.upload.url;

        let formData: FormData = new FormData();
        formData.append(fileobj.name, fileobj.file);

        let headers = new Headers();

        //headers.append('noLoader', 'true');
        //headers.append('noNoti', 'true');

        let options = new RequestOptions({ headers: headers });

        return this.ccaHttp.postObservable(url.href, formData, options);
    }
    downloadFile(fileobj: ICcaFile, data: Response) {
        var blob = new Blob([data], { type: fileobj.type });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    }
    removeFileFromData(fileobj: ICcaFile) {
        this.data.files = this.data.files.filter(p => p != fileobj);
    }
    triggerInputClick(file: Element) {
        //let event = new MouseEvent('click', { bubbles: true });
        //file.dispatchEvent(event);
        this.fileInput.nativeElement.
            click();
    }
}