import { NextFunction, Request, Response } from "express";

import { validator } from "../helpers/validator";

class ApiValidation {
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
    
  });

  public update = validator({
    
  });

  public destroy = validator({
    
  });
}

export const apiValidation = new ApiValidation();
