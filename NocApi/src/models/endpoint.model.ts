import { Document, Schema, model } from "mongoose";
import { IModel } from './';
import { ObjectId } from "bson";
import { ClientDefaults } from "../../config/clientDefaults";

const endPointSchema = new Schema(
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
        modelId: {
            type: Schema.Types.ObjectId,
            required:true
        },
        putOp: {
            type: Schema.Types.Boolean,
            required:true
        },
        getOp: {
            type: Schema.Types.Boolean,
            required: true
        },
        postOp: {
            type: Schema.Types.Boolean,
            required: true
        },
        deleteOp: {
            type: Schema.Types.Boolean,
            required: true
        }
    },
    { timestamps: true }
);

//hooks
endPointSchema.pre('save', function (next) {
    //here we have to check if the endPoint name already exisits for that client and app

    

    next();
});
endPointSchema.pre('remove', function (next) {
    //here we have to check if the endPoint name already exisits for that client and app
    next();
});


endPointSchema.methods = {
    //methods that can be defined called on instance of the endPoint. like extension methods on the instance
}
endPointSchema.statics = {
    //static that can be defined and called on the schema level. like repository
}

export const nocEndPoint = model<IModel>("NocEndPoint", endPointSchema);



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