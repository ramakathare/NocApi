import { Document, Schema, model } from "mongoose";
import { IModel } from './';
import { ObjectId } from "bson";
import { ClientDefaults } from "../../config/clientDefaults";



const modelSchema = new Schema(
    {
        clientId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "NocClient",
            default: ClientDefaults.clientId
        },
        appId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "NocApps",
            default: ClientDefaults.appId
        },
        name: {
            required: true,
            type: Schema.Types.String
        },
        desc: {
            required: false,
            type: Schema.Types.String
        },
        properties: {
            type: Schema.Types.Mixed, required: true
        }
    },
    { timestamps: true }
);

//hooks
modelSchema.pre('save', function (next) {
    //here we have to check if the model name already exisits for that client and app

    

    next();
});
modelSchema.pre('remove', function (next) {
    //here we have to check if the model name already exisits for that client and app
    next();
});


modelSchema.methods = {
    //methods that can be defined called on instance of the model. like extension methods on the instance
}
modelSchema.statics = {
    //static that can be defined and called on the schema level. like repository
}

export const nocModel = model<IModel>("NocModel", modelSchema);



//export interface IModel extends Document {
//    name: "Products",
//    desc: "Description",
//    properties: {
//        id: {
//            "type": "ObjectId"
//        },
//        name: {
//            "type": "String",
//            "lowercase": false,
//            "upppercase": false,
//            "match": null,
//            "enum": null,
//            "default": "",
//            "required": true
//        },
//        cost: {
//            "type": "Number",
//            "min": 0,
//            "max": 100,
//            "required": true
//        },
//        created: {
//            "type": "Date",
//            "required": true
//        },
//        forSale: {
//            "type": "Boolean",
//            "required": true,
//            "default": false
//        },
//        image: {
//            "type": "Buffer",
//            "required": false
//        }
//    }
//}