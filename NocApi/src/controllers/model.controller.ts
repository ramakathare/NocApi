import { NextFunction, Request, Response } from "express";
import { IModel } from "../models";

import { BAD_REQUEST, NOT_FOUND, OK } from "http-status-codes";
import { nocModel } from "../models";
import { ClientDefaults } from "../../config/clientDefaults";

import { ObjectId } from "bson";

class ModelController {
    public async index(req: Request, res: Response, next: NextFunction) {
        const { limit = 50, skip = 0 } = req.query;
        const models = await nocModel
            .find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit);
        res.status(OK).json(models);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const { name, desc, properties } = req.body;
        const model = new nocModel({
            name: name,
            desc: desc,
            properties: properties,
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
        const { name, desc, properties } = req.body;
        const model = {
            name: name,
            desc: desc,
            properties: properties,
            clientId: ClientDefaults.clientId,
            appId: ClientDefaults.appId
        };

        try {
            res.json(await nocModel.update({ _id: req.params.id }, model));
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

export const modelController = new ModelController();
