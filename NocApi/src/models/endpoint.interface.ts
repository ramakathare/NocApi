
import { Document, Schema } from 'mongoose';
import { ObjectId } from 'bson';



//export interface IMongoProperty_ObjectId extends IMongoProperty{
//    type: "ObjectId"
//}
//export interface IMongoProperty_Number extends IMongoProperty {
//    type: "Number",
//    min?: number,
//    max?: number,
//}
//export interface IMongoProperty_String extends IMongoProperty{
//    type: "String",
//    lowercase?: boolean,
//    upppercase?: false,
//    match?: null,
//    enum?: null,
//    default?: string,
//    length?:number
//}
//export interface IMongoProperty_Bool extends IMongoProperty{
//    type: "Boolean"
//}
////export interface IMongoProperty_Buffer {
////    type: "Buffer",
////    required?: boolean
////}
//export interface IMongoProperty_Date extends IMongoProperty{
//    type: "Date",
//    default?: Date
//}

export interface IEndPoint extends Document {
    name: string,
    desc:string,
    modelId: string,
    putOp: boolean,
    getOp: boolean,
    postOp: boolean,
    deleteOp: boolean,
}