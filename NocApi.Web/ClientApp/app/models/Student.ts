export interface IStudent {
    id: number;
    name?: string | undefined;
    departmentId: number;
    createdOn: Date;
    course?: any | undefined;
    payment?: any[] | undefined;
}