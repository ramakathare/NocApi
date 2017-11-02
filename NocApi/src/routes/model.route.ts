import { Router } from "express";
import { modelController } from "../controllers";
import { modelValidation } from "../validations";

const router = Router();

router
    .route("/")
    /**
     * @api {get} /models Index All Models
     * @apiName Index
     * @apiGroup Model
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    .get(modelValidation.index, modelController.index)
    /**
     * @api {post} /models Create New Model
     * @apiName Create
     * @apiGroup Model
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    .post(modelValidation.create, modelController.create);

router
    .route("/:id")
    /**
     * @api {get} /models/:id Show Model Info
     * @apiName Show
     * @apiGroup Model
     *
     * @apiParam {Number} id Model's Unique Object ID.
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    //.get(modelValidation.show, modelController.show)

    /**
     * @api {put} /models/:id Update Model Info
     * @apiName Update
     * @apiGroup Model
     *
     * @apiParam {Number} id Model's Unique Object ID.
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    .put(modelValidation.update, modelController.update)

    /**
     * @api {delete} /models/:id Delete Model
     * @apiName Delete
     * @apiGroup Model
     *
     * @apiParam {Number} id Model's Unique Object ID.
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    //.delete(modelValidation.destroy, modelController.destroy);

export default router;
