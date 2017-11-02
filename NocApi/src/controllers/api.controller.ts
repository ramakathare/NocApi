import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status-codes";
import { ClientDefaults } from "../../config/clientDefaults";
import { ObjectId } from "bson";
import { Document, Schema, model, Model } from "mongoose";

class ApiController {

    //todo : fix : can not override schema once compiled
    //put route is not matching
 
    public async index(req: Request, res: Response, next: NextFunction) {

        var modelName = req.params.endpoint + "_" + ClientDefaults.clientId + "_" + ClientDefaults.appId;
        const dyncamicModel: Model<any> = model<any>(modelName, new Schema({ type: Schema.Types.Mixed }, { strict: false }));

        const { limit = 50, skip = 0 } = req.query;
        const models = await dyncamicModel
            .find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit);
        res.status(OK).json(models);
    }

    public async create(req: Request, res: Response, next: NextFunction) {

        var modelName = req.params.endpoint + "_" + ClientDefaults.clientId + "_" + ClientDefaults.appId;
        const dyncamicModel: Model<any> = model<any>(modelName, new Schema({ type: Schema.Types.Mixed }, { strict: false }));

        var currentModel = new dyncamicModel(req.body);
        try {
            res.json(await currentModel.save());
        } catch (error) {
            res.status(BAD_REQUEST).send(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        var modelName = req.params.endpoint + "_" + ClientDefaults.clientId + "_" + ClientDefaults.appId;
        const dyncamicModel: Model<any> = model<any>(modelName, new Schema({ type: Schema.Types.Mixed }, { strict: false }));

        var id = req.params(0);

        try {
            res.json(await dyncamicModel.update({ _id: id }, req.body));
        } catch (error) {
            res.status(BAD_REQUEST).send(error);
        }
    }
    //to do : implement delete model. This will delete all the models and data related to the model. We have to check if the model is used in any query also
    //public async destroy(req: Request, res: Response, next: NextFunction) {



    //    try {
    //        res.json(await nocModel.remove({
    //            _id: req.params.id
    //        });
    //    } catch (error) {
    //        res.status(BAD_REQUEST).send(error);
    //    }
    //}
}

export const apiController = new ApiController();
