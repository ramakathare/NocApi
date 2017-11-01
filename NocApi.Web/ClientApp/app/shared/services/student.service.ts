import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { IStudent } from '../../models/Student';
import { Observable } from 'rxjs/Observable';
import { CcaHttp } from '../../../modules/cca-http/cca-http.service';
import { APP_CONFIG, IAppConfig } from '../../config';

@Injectable()
export class StudentService {
     
    constructor(
        private http: Http, // Use for everything else,
        private chttp: CcaHttp,
        @Inject(APP_CONFIG) private config: IAppConfig) {

    }

    getStudents(): Observable<IStudent[]> {
        // ** TransferHttp example / concept **
        //    - Here we make an Http call on the server, save the result on the window object and pass it down with the SSR,
        //      The Client then re-uses this Http result instead of hitting the server again!

        //  NOTE : transferHttp also automatically does .map(res => res.json()) for you, so no need for these calls
        //return this.transferHttp.get(`${this.baseUrl}/api/students`);
        return this.chttp.getObservable(`${this.config.apiEndpoint}/api/student/getAll`);
    }

    getStudent(student: IStudent): Observable<IStudent> {
        //return this.transferHttp.get(`${this.baseUrl}/api/students/` + student.id);
        return this.chttp.getObservable(`${this.config.apiEndpoint}/api/student/` + student.id);
    }

    deleteStudent(student: IStudent): Observable<any> {
        //return this.http.delete(`${this.baseUrl}/api/students/` + student.id);
        return this.chttp.deleteObservable(`${this.config.apiEndpoint}/api/student/` + student.id);
    }

    updateStudent(student: IStudent): Observable<any> {
        //return this.http.put(`${this.baseUrl}/api/students/` + student.id, student);
        return this.chttp.putObservable(`${this.config.apiEndpoint}/api/student/` + student.id, student);
    }

    addStudent(newStudentName: string): Observable<any> {
        //return this.http.post(`${this.baseUrl}/api/students`, { name: newStudentName })
        return this.chttp.postObservable(`${this.config.apiEndpoint}/api/student`, { name: newStudentName })
    }
}
