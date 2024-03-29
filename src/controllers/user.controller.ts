// src/controller/user.controller.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib
import setCookies from "../libs/functions/setCookies";

// Import Essential Librarys
import { Request, Response } from "express";
import { isEmpty, omit } from "lodash";

// Import Essential Services
import { createUser, deleteUser, getAllUser, getUserbyId, updateUser } from "../service/user.service";
import { deleteUserSessionHandler } from "./session.controller";

// Import Essential Dto Classes ??

// Import Required Schemas
import { CreateUserInput, UpdateUserInput, UserIDInput } from "../schema/user.schema";

// Import Other ??


// Create a User
export async function createUserHandler(req: Request<any, any, CreateUserInput["body"]>, res: Response) {
  try {
    const user = await createUser(req.body);
    setDevLog(filename, level.MARK, `User Created.`);
    return res.status(200).send({
      message: `User Created.`,
      data: user
    });
    // return res.status(200).send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createUserHandler is: ${error.message}`);

    if (error.message.includes("duplicate key")) {
      let duplicatAttribute: string = "";
      let duplicatkey: string = "";

      if (error.message.includes("email")) {
        duplicatAttribute = error.message.split("email: \"")[1].split("\" }")[0];
        duplicatkey = "email";
      } else if (error.message.includes("userName")) {
        duplicatAttribute = error.message.split("username: \"")[1].split("\" }")[0];
        duplicatkey = "userName";
      }

      return res.status(409)
        .send(
          {
            message: `User alredy exists with ${duplicatkey} i.e. "${duplicatAttribute}" .`,
            data: {
              info: `${duplicatkey} had alredy used. i.e.`,
              attribute: duplicatAttribute
            },
            error: error.message
          }
        );
    } else {
      return res.status(409).send(error.message);
    }
  }
}

// Get Current User Details
export async function getCurrntUserHandler(req: Request, res: Response) {
  try {
    const userId = await res.locals.user._id;
    const user = await getUserbyId(userId);
    if (!isEmpty(user)) {
      setDevLog(filename, level.MARK, `User for Current Session Found.`);
      return res.status(200).send({
        message: `User for Current Session Found.`,
        data: user
      });
    } else {
      setDevLog(filename, level.WARN, `No user record available for id: ${req.params._id}`);
      return res.status(400).send({
        message: `No user record available for id: ${req.params._id}`,
        data: user
      });
    }
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at getCurrntUserHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// Update Current Users Data
export async function updateCurrentUserHandler(req: Request<any, any, CreateUserInput["body"]>, res: Response) {
  try {
    const userId = await res.locals.user._id;
    const user = await updateUser(userId, req.body);

    if (user.modifiedCount === 1 && user.matchedCount === 1) {
      setDevLog(filename, level.MARK, `Current User's Data Successfully`);
      return res.status(200).send({
        message: `Current User's Data Successfully`,
        data: user
      });
    } else if (user.matchedCount === 1 && user.modifiedCount === 0) {
      setDevLog(filename, level.ERROR, `Unable to update Current User's data`);
      return res.status(409).send({
        message: `Unable to update Current User's data`,
        data: user
      });
      // } else if (user.matchedCount === 0) {
      // setDevLog(filename, level.ERROR, `No User found for current Session`);
      //   return res.status(404).send({
      //     message: `No User found for current Session`,
      //     data: user
      //   });
    } else {
      setDevLog(filename, level.WARN, `Error occured when updating Current user's Data`);
      return res.status(404).send({
        message: `Error occured when updating Current user's Data`,
        data: user
      });
    }
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at updateCurrentUserHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// Delete Current User
export async function deleteCurrentUserHandler(req: Request<any, any, any, UserIDInput["params"]>, res: Response) {
  try {
    const userId = await res.locals.user._id;
    const user = await deleteUser(userId);
    if (user.deletedCount === 1) {
      setDevLog(filename, level.MARK, ` Current User deleted Successfully.`);
      deleteUserSessionHandler(req, res);
      return res.status(200).send({
        message: `User with id: ${req.params._id} has deleted Successfully.`,
        data: user
      });
    } else {
      setDevLog(filename, level.ERROR, `No User found for current Session`);
      return res.status(400).send({
        message: `No User found for current Session`,
        data: user
      });
    }
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at deleteCurrentUserHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// Get User by Id
export async function getUserbyIdHandler(req: Request<any, any, any, UserIDInput["params"]>, res: Response) {
  try {
    const user = await getUserbyId(req.params._id);
    if (!isEmpty(user)) {
      setDevLog(filename, level.MARK, `User with id: ${req.params._id} Found.`);
      return res.status(200).send({
        message: `User with id: ${req.params._id} Found.`,
        data: user
      });
      // return res.status(200).send(omit(user, "password"));
    } else {
      setDevLog(filename, level.WARN, `No user record available for id: ${req.params._id}`);
      return res.status(400).send({
        message: `No user record available for id: ${req.params._id}`,
        data: user
      });
    }
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at getUserbyIdHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// Update an User's Data
export async function updateUserHandler(req: Request<any, any, UpdateUserInput["body"], UserIDInput["params"]>, res: Response) {
  try {
    const user = await updateUser(req.params._id, req.body);

    if (user.modifiedCount === 1 && user.matchedCount === 1) {
      setDevLog(filename, level.MARK, `User Updated Successfully with id: ${req.params._id}`);
      return res.status(200).send({
        message: `User Updated Successfully with id: ${req.params._id}`,
        data: user
      });
    } else if (user.matchedCount === 1 && user.modifiedCount === 0) {
      setDevLog(filename, level.ERROR, `Unable to update User with id: ${req.params._id} `);
      return res.status(409).send({
        message: `Unable to update User with id: ${req.params._id}`,
        data: user
      });
    } else if (user.matchedCount === 0) {
      setDevLog(filename, level.ERROR, `No User found with id: ${req.params._id}`);
      return res.status(404).send({
        message: `No User found with id: ${req.params._id}`,
        data: user
      });
    } else {
      setDevLog(filename, level.WARN, `Error occured when updating user with id: ${req.params._id}`);
      return res.status(404).send({
        message: `Error occured when updating user with id: ${req.params._id}`,
        data: user
      });
    }

    // console.log(user);
    // return res.status(200).send(omit(user, "password"));
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at updateUserHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// Delete or remove a User
export async function deleteUserHandler(req: Request<any, any, any, UserIDInput["params"]>, res: Response) {
  try {
    const user = await deleteUser(req.params._id);
    if (user.deletedCount === 1) {
      setDevLog(filename, level.MARK, `User with id: ${req.params._id} has deleted Successfully.`);
      return res.status(200).send({
        message: `User with id: ${req.params._id} has deleted Successfully.`,
        data: user
      });
      // return res.status(200).send(user);
      // return res.status(200).send(omit(user, "password"));
    } else {
      setDevLog(filename, level.ERROR, `No User found with id: ${req.params._id}`);
      return res.status(400).send({
        message: `No User found with id: ${req.params._id}`,
        data: user
      });
    }
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at deleteUserHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// Get All User
export async function getAllUserHandler(req: Request, res: Response) {
  try {
    const users = await getAllUser();

    // users.forEach(function (elements: any) {
    //   delete elements._doc["password"]
    // });
    // // console.log(users);
    // return res.status(200).send(users);

    if (!isEmpty(users)) {
      setDevLog(filename, level.MARK, `Users Found.`);
      return res.status(200).send({
        message: `Users Found.`,
        data: users
      });
      // return res.status(200).send(omit(users, "password"));
    } else {
      setDevLog(filename, level.WARN, `Users Found.`);
      return res.status(400).send({
        message: `No user record available.`,
        data: users
      });
    }

  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at getAllUserHandler is: ${error.message}`);
    return res.status(404).send(error.message);
  }
}
