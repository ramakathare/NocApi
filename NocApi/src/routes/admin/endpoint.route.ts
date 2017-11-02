import { Router } from "express";
import { endpointController } from "../../controllers";
import { endpointValidation } from "../../validations";

const router = Router();

router
    .route("/")
    /**
     * @api {get} /endpoints Index All Models
     * @apiName Index
     * @apiGroup Model
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    .get(endpointValidation.index, endpointController.index)
    /**
     * @api {post} /endpoints Create New Model
     * @apiName Create
     * @apiGroup Model
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    .post(endpointValidation.create, endpointController.create);

router
    .route("/:id")
    /**
     * @api {get} /endpoints/:id Show Model Info
     * @apiName Show
     * @apiGroup Model
     *
     * @apiParam {Number} id Model's Unique Object ID.
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    //.get(endpointValidation.show, endpointController.show)

    /**
     * @api {put} /endpoints/:id Update Model Info
     * @apiName Update
     * @apiGroup Model
     *
     * @apiParam {Number} id Model's Unique Object ID.
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    .put(endpointValidation.update, endpointController.update)

/**
 * @api {delete} /endpoints/:id Delete Model
 * @apiName Delete
 * @apiGroup Model
 *
 * @apiParam {Number} id Model's Unique Object ID.
 *
 * @apiSuccess {String} firstname Firstname of the Model.
 * @apiSuccess {String} lastname  Lastname of the Model.
 */
//.delete(endpointValidation.destroy, endpointController.destroy);

export default router;
