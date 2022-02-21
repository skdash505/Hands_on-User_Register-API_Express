// src/routes.ts

import { Express, Router, Request, Response } from "express";

import validateRequest from "../middleware/validateRequest";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
  app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
}