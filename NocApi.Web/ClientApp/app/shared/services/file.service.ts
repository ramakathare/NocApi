import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { IFile } from '../../models';
import { Observable } from 'rxjs/Observable';
import { CcaHttp } from '../../../modules/cca-http/cca-http.service';
import { APP_CONFIG, IAppConfig } from '../../config';

@Injectable()
export class FileService {
     
    constructor(
        private http: Http, // Use for everything else,
        private chttp: CcaHttp,
        @Inject(APP_CONFIG) private config: IAppConfig) {

    }

    getFiles(): Observable<IFile[]> {
        // ** TransferHttp example / concept **
        //    - Here we make an Http call on the server, save the result on the window object and pass it down with the SSR,
        //      The Client then re-uses this Http result instead of hitting the server again!

        //  NOTE : transferHttp also automatically does .map(res => res.json()) for you, so no need for these calls
        //return this.transferHttp.get(`${this.baseUrl}/api/files`);
        return this.chttp.getObservable(`${this.config.apiEndpoint}/api/files/getAll`);
    }

    getFile(file: IFile): Observable<IFile> {
        //return this.transferHttp.get(`${this.baseUrl}/api/files/` + file.id);
        return this.chttp.getObservable(`${this.config.apiEndpoint}/api/files/` + file.id);
    }

    deleteFile(file: IFile): Observable<any> {
        //return this.http.delete(`${this.baseUrl}/api/files/` + file.id);
        return this.chttp.deleteObservable(`${this.config.apiEndpoint}/api/files/` + file.id);
    }

    updateFile(file: IFile): Observable<any> {
        //return this.http.put(`${this.baseUrl}/api/files/` + file.id, file);
        return this.chttp.putObservable(`${this.config.apiEndpoint}/api/files/` + file.id, file);
    }

    addFile(newFileName: string): Observable<any> {
        //return this.http.post(`${this.baseUrl}/api/files`, { name: newFileName })
        return this.chttp.postObservable(`${this.config.apiEndpoint}/api/file`, { name: newFileName })
    }
}
