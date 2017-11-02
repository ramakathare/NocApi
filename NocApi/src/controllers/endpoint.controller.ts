import { NextFunction, Request, Response } from "express";
import { IEndPoint } from "../models";

import { BAD_REQUEST, NOT_FOUND, OK } from "http-status-codes";
import { nocEndPoint } from "../models";
import { ClientDefaults } from "../../config/clientDefaults";

import { ObjectId } from "bson";

class EndPointController {
    public async index(req: Request, res: Response, next: NextFunction) {
        const { limit = 50, skip = 0 } = req.query;
        const models = await nocEndPoint
            .find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit);
        res.status(OK).json(models);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const model = new nocEndPoint({
            name: req.body.name,
            desc: req.body.desc,
            modelId: new ObjectId(req.body.modelId),
            putOp: req.body.putOp,
            getOp: req.body.getOp,
            postOp: req.body.postOp,
            deleteOp: req.body.deleteOp,
            clientId: ClientDefaults.clientId,
            appId: ClientDefaults.appId
        });

        try {
            res.json(await model.save());
        } catch (error) {
            res.status(BAD_REQUEST).send(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        const model = {
            name: req.body.name,
            desc: req.body.desc,
            modelId: new ObjectId(req.body.modelId),
            putOp: req.body.putOp,
            getOp: req.body.getOp,
            postOp: req.body.postOp,
            deleteOp: req.body.deleteOp,
            clientId: ClientDefaults.clientId,
            appId: ClientDefaults.appId
        };

        try {
            res.json(await nocEndPoint.update({ _id: req.params.id }, model));
        } catch (error) {
            res.status(BAD_REQUEST).send(error);
        }
    }
    //to do : implement delete model. This will delete all the models and data related to the model. We have to check if the model is used in any query also
    //public async destroy(req: Request, res: Response, next: NextFunction) {

        

    //    try {
    //        res.json(await nocEndPoint.remove({
    //            _id: req.params.id
    //        });
    //    } catch (error) {
    //        res.status(BAD_REQUEST).send(error);
    //    }
    //}
}

export const endpointController = new EndPointController();
