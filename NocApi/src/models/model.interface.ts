
import { Document, Schema } from 'mongoose';

export interface IMongoProperty {
    name: string,
    type: string,
    required:boolean
}

export interface IMongoProperty_ObjectId extends IMongoProperty{
    type: "ObjectId"
}
export interface IMongoProperty_Number extends IMongoProperty {
    type: "Number",
    min?: number,
    max?: number,
}
export interface IMongoProperty_String extends IMongoProperty{
    type: "String",
    lowercase?: boolean,
    upppercase?: false,
    match?: null,
    enum?: null,
    default?: string,
    length?:number
}
export interface IMongoProperty_Bool extends IMongoProperty{
    type: "Boolean"
}
//export interface IMongoProperty_Buffer {
//    type: "Buffer",
//    required?: boolean
//}
export interface IMongoProperty_Date extends IMongoProperty{
    type: "Date",
    default?: Date
}

//export type IMongoPropertyTypes = IMongoProperty_ObjectId |
//    IMongoProperty_Bool |
//    IMongoProperty_Date |
//    IMongoProperty_Number |
//    IMongoProperty_String;

//export interface IMongoModelProperties {
//    [key: string]: IMongoProperty
//    id: IMongoProperty_ObjectId
//}

export interface IModel extends Document {
    name: string,
    desc: string,
    properties: IMongoProperty[]
}