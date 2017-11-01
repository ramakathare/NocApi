import {
    Component, OnInit, Output,
    // animation imports
    trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { IStudent } from '../../models/Student';
import { StudentService } from '../../shared/services';
import { ActivatedRoute } from '@angular/router';

import { ICcaGridData, CcaGridService, Guid } from '../../../modules/cca-grid';

import { APP_CONFIG, IAppConfig } from '../../config';

@Component({
    selector: 'students',
    templateUrl: './student.component.html',
    // styleUrls: ['./students.component.css']
})
export class StudentComponent implements OnInit {

    students: IStudent[];
    selectedStudent: IStudent;

    studentsGridData: ICcaGridData;
    studentsGridData1: ICcaGridData;


    // Use "constructor"s only for dependency injection
    constructor(private studentService: StudentService,
        //private route: ActivatedRoute,
        private ccagridservice: CcaGridService,
        @Inject(APP_CONFIG) private config: IAppConfig
    ) {

    }
    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {
        let that = this;
        this.studentsGridData = {
            selectable: "multi",
            className: "studentsGrid",
            gridId: Guid.newGuid(),
            model: [
                { field: "id", hidden: true },
                { display:"Name custom", field: "name", width: "30%" },
                { field: "createdOn", search: false, sort: false, width: "70%", format: (row, value) => { return new Date(value).toLocaleDateString(); } },
            ],
            sort: { field: "id" },
            url: new URL(`${this.config.apiEndpoint}/api/student/GetAllforGrid`),
            actions: {
                "Edit": {
                    className: "studentsGridDataEdit", action: (index) => { console.log(index); }
                },
                "delete": {
                    className: "studentsGridDataDelete", action: (index) => { console.error(index); }
                }
            },
            beforeLoad: () => {
                console.log("before load");
            },
            onLoadSuccess: (result) => {
                that.studentsGridData.actions["Edit"].disabledRows = [];
                result.rows.forEach((row, index) => {
                    if (row.name.indexOf("Student") >= 0) {
                        that.studentsGridData.actions["Edit"].disabledRows.push(index);
                    }
                });
            },
            onLoadError: (error) => {
                console.info(error);
            },
            onLoadComplete: () => {
                console.log("load completed");
            },
        }
        //this.studentsGridData.filterData = {
        //    name: "Rama"
        //}
        this.ccagridservice.loadGrid(this.studentsGridData.gridId);
        
    }

    editStudent(id) {
        
        
        alert(id)
    }

    onSelect1(student: IStudent): void {
        this.selectedStudent = student;

        this.studentService.getStudent(this.selectedStudent).do(p => {
            return p;
        });

        this.studentService.getStudent(this.selectedStudent).do(p => {
            return p;
        });


        this.studentService.getStudent(this.selectedStudent).do(p => {
            return p;
        });
    }

    async onSelect(student: IStudent): Promise<IStudent> {
        this.selectedStudent = student;
       return await this.studentService.getStudent(this.selectedStudent).do(p => {
           return p;
       }).toPromise();
    }

    reloadStudentsGrid = () => {
        this.ccagridservice.reLoadGrid(this.studentsGridData.gridId);
        console.log(this.studentsGridData);
    }

    //deleteStudent(student) {
    //    this.studentService.deleteStudent(student).subscribe(result => {
    //        console.log('Delete student result: ', result);
    //        let position = this.students.indexOf(student);
    //        this.students.splice(position, 1);
    //    }, error => {
    //        console.log(`There was an issue. ${error._body}.`);
    //    });
    //}

    //addStudent(newStudentName) {
    //    this.studentService.addStudent(newStudentName).subscribe(result => {
    //        console.log('Post student result: ', result);
    //        this.students.push(result.json());
    //    }, error => {
    //        console.log(`There was an issue. ${error._body}.`);
    //    });
    //}
}
