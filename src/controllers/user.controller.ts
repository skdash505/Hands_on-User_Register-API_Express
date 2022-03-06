// src/controller/user.controller.ts

import { Request, Response } from "express";
import { isEmpty, omit } from "lodash";
import { createUser, deleteUser, getAllUser, getUserbyId, updateUser } from "../service/user.service";
import { CreateUserInput, UpdateUserInput, UserIDInput } from "../schema/user.schema";

import path from "path";
import parentLogger from "../utils/log";
const log = parentLogger.child({ filename: path.basename(__filename) });

export async function createUserHandler(req: Request<any, any, CreateUserInput["body"]>, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.status(200).send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    log.error("Error at User Controller is:", error.message);

    if (error.message.includes("duplicate key")) {
      let duplicateMail = error.message.split("email: \"")[1].split("\" }")[0];
      return res.status(409)
        .send(
          {
            message: `User alredy exists with email i.e. "${duplicateMail}" .`,
            data: {
              info: "Email had alredy used. i.e.",
              email: duplicateMail
            },
            error: error.message
          }
        )
        ;
    } else {
      return res.status(409).send(error.message);
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

    if (!isEmpty(users)) {
      return res.status(200).send(users);
      // return res.status(200).send(omit(users, "password"));
    } else {
      return res.status(400).send({
        message: `No user record available.`,
        data: users
      });
    }

  } catch (error: any) {
    log.error("Error at User Controller is:", error.message);
    return res.status(404).send(error.message);
  }
}

export async function getUserbyIdHandler(req: Request<any, any, any, UserIDInput["query"]>, res: Response) {
  try {
    const user = await getUserbyId(req.query._id);
    if (!isEmpty(user)) {
      return res.status(200).send(user);
      // return res.status(200).send(omit(user, "password"));
    } else {
      return res.status(400).send({
        message: `No user record available for id: ${req.query._id}.`,
        data: user
      });
    }
  } catch (error: any) {
    log.error("Error at User Controller is:", error.message);
    return res.status(409).send(error.message);
  }
}

export async function updateUserHandler(req: Request<any, any, UpdateUserInput["body"], UserIDInput["query"]>, res: Response) {
  try {
    const user = await updateUser(req.query._id, req.body);

    if (user.modifiedCount !== 0 && user.matchedCount !== 0) {
      return res.status(200).send({
        message: `Record Updated Successfully for id: ${req.query._id} `,
        data: user
      });
    } else if (user.matchedCount !== 0 && user.modifiedCount === 0) {
      return res.status(409).send({
        message: `Unable to update User record for id: ${req.query._id} `,
        data: user
      });
    } else if (user.matchedCount === 0) {
      return res.status(404).send({
        message: `Unable to find User record with id: ${req.query._id} `,
        data: user
      });
    } else {
      return res.status(404).send({
        message: `Some error occured for User record with id: ${req.query._id} `,
        data: user
      });
    }

    // console.log(user);
    // return res.status(200).send(omit(user, "password"));
  } catch (error: any) {
    log.error("Error at User Controller is:", error.message);
  }
}

export async function deleteUserHandler(req: Request<any, any, any, UserIDInput["query"]>, res: Response) {
  try {
    const user = await deleteUser(req.query._id);
    if (user.deletedCount !== 0) {
      return res.status(200).send({
        message: `User record with ${req.query._id} has deleted Successfully.`,
        data: user
      });
      // return res.status(200).send(user);
      // return res.status(200).send(omit(user, "password"));
    } else {
      return res.status(400).send({
        message: `No user record available for id: ${req.query._id}.`,
        data: user
      });
    }
  } catch (error: any) {
    log.error("Error at User Controller is:", error.message);
    return res.status(409).send(error.message);
  }
}