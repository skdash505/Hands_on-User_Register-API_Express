// src/controller/user.controller.ts

import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, deleteUser, getAllUser, getUserbyId, updateUser } from "../service/user.service";
import { CreateUserInput, UpdateUserInput, UserIDInput } from "../schema/user.schema";
import log from "../utils/log";

export async function createUserHandler(req: Request<any, any, CreateUserInput["body"]>, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.status(200).send(omit(user.toJSON(), "password"));
  } catch (e: any) {
    log.error("Error at User Controller is:", e.message);

    if (e.message.includes("duplicate key")) {
      let duplicateMail = e.message.split("email: \"")[1].split("\" }")[0];
      return res.status(409)
        .send(
          {
            message: `Email had alredy used.`,
            data: {
              info: "Email had alredy used. i.e.",
              mail: duplicateMail
            },
            error: e.message
          }
        )
        ;
    } else {
      return res.status(409).send(e.message);
    }
  }
}

export async function getAllUserHandler(req: Request, res: Response) {
  try {
    const users = await getAllUser();

    // users.forEach(function (elements: any) {
    //   delete elements._doc["password"]
    // });
    // // console.log(users);
    // return res.status(200).send(users);

    return res.status(200).send(omit(users, "password"));
  } catch (e: any) {
    log.error("Error at User Controller is:", e.message);
    return res.status(404).send(e.message);
  }
}

export async function getUserbyIdHandler(req: Request<any, any, any, UserIDInput["query"]>, res: Response) {
  try {
    const user = await getUserbyId(req.query._id);
    return res.status(200).send(omit(user, "password"));
  } catch (e: any) {
    log.error("Error at User Controller is:", e.message);
    return res.status(409).send(e.message);
  }
}

export async function updateUserHandler(req: Request<any, any, UpdateUserInput["body"], UserIDInput["query"]>, res: Response) {
  try {
    const user = await updateUser(req.query._id, req.body);
    console.log(user);
    return res.status(200).send(omit(user, "password"));
  } catch (e: any) {
    log.error("Error at User Controller is:", e.message);

    if (e.message.includes("duplicate key")) {
      let duplicateMail = e.message.split("email: \"")[1].split("\" }")[0];
      return res.status(409)
        .send(
          {
            message: `Email had alredy used.`,
            data: {
              info: "Email had alredy used. i.e.",
              mail: duplicateMail
            },
            error: e.message
          }
        )
        ;
    } else {
      return res.status(409).send(e.message);
    }
  }
}

export async function deleteUserHandler(req: Request<any, any, any, UserIDInput["query"]>, res: Response) {
  try {
    const user = await deleteUser(req.query._id);
    console.log(user);
    return res.status(200).send(omit(user, "password"));
  } catch (e: any) {
    log.error("Error at User Controller is:", e.message);
    return res.status(409).send(e.message);
  }
}