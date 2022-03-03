// src/middleware/validateRequest.ts

import { ObjectSchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../utils/log";

const validate = (schema: ObjectSchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (e) {
    log.error(e);
    return res.status(400).send(e.errors);
  }
};

export default validate;