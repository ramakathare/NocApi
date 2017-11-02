import { NextFunction, Request, Response } from "express";

import { validator } from "../helpers/validator";

class ModelValidation {
  public index = validator({
    limit: {
      in: "query",
      isInt: {
        errorMessage: "Please Provide An Integer Value Less Than 50",
        options: [{ max: 50 }]
      },
      optional: true
    },
    skip: { in: "query", isInt: true, optional: true }
  });

    

  public create = validator({
    name: {
      in: "body",
      notEmpty: true
      }
    //  ,
    //'properties.name': {
    //  in: "body",
    //  notEmpty: true
    //},
    //'properties.type': {
    //    in: "body",
    //    notEmpty: true
    //}
  });

  public update = validator({
      name: {
          in: "body",
          notEmpty: true
      }
      //,
      //'properties.name': {
      //    in: "body",
      //    notEmpty: true
      //},
      //'properties.type': {
      //    in: "body",
      //    notEmpty: true
      //}
  });
}

export const modelValidation = new ModelValidation();
