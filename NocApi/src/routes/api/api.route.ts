import { Router } from "express";
import { apiController } from "../../controllers";
import { apiValidation } from "../../validations";

const router = Router();

router
    .route("/:endpoint")
    /**
     * @api {get} /models Index All Models
     * @apiName Index
     * @apiGroup Model
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    .get(apiValidation.index, apiController.index)
    /**
     * @api {post} /models Create New Model
     * @apiName Create
     * @apiGroup Model
     *
     * @apiSuccess {String} firstname Firstname of the Model.
     * @apiSuccess {String} lastname  Lastname of the Model.
     */
    .post(apiValidation.create, apiController.create)
    .put(apiValidation.update, apiValidation.update);

//router
//    .route("/:endpoint*")
//    /**
//     * @api {get} /models/:id Show Model Info
//     * @apiName Show
//     * @apiGroup Model
//     *
//     * @apiParam {Number} id Model's Unique Object ID.
//     *
//     * @apiSuccess {String} firstname Firstname of the Model.
//     * @apiSuccess {String} lastname  Lastname of the Model.
//     */
//    //.get(modelValidation.show, modelController.show)

//    /**
//     * @api {put} /models/:id Update Model Info
//     * @apiName Update
//     * @apiGroup Model
//     *
//     * @apiParam {Number} id Model's Unique Object ID.
//     *
//     * @apiSuccess {String} firstname Firstname of the Model.
//     * @apiSuccess {String} lastname  Lastname of the Model.
//     */
//    .put(apiValidation.update, apiValidation.update)

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
