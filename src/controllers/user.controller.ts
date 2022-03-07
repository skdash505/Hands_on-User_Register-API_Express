// src/controller/user.controller.ts

import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

import { Request, Response } from "express";
import { isEmpty, omit } from "lodash";
import { createUser, deleteUser, getAllUser, getUserbyId, updateUser } from "../service/user.service";
import { CreateUserInput, UpdateUserInput, UserIDInput } from "../schema/user.schema";

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

//Get All User
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
    setDevLog(filename, level.ERROR, `Error at getAllUserHandler is: ${error.message}`);
    return res.status(404).send(error.message);
  }
}

// Get User by Id
export async function getUserbyIdHandler(req: Request<any, any, any, UserIDInput["query"]>, res: Response) {
  try {
    const user = await getUserbyId(req.query._id);
    if (!isEmpty(user)) {
      setDevLog(filename, level.MARK, `User with id: ${req.query._id} Found.`);
      return res.status(200).send({
        message: `User with id: ${req.query._id} Found.`,
        data: user
      });
      // return res.status(200).send(omit(user, "password"));
    } else {
      setDevLog(filename, level.WARN, `No user record available for id: ${req.query._id}`);
      return res.status(400).send({
        message: `No user record available for id: ${req.query._id}`,
        data: user
      });
    }
  } catch (error: any) {
    setDevLog(filename, level.ERROR, `Error at getUserbyIdHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

//Update an User's Data
export async function updateUserHandler(req: Request<any, any, UpdateUserInput["body"], UpdateUserInput["query"]>, res: Response) {
  try {
    const user = await updateUser(req.query._id, req.body);

    if (user.modifiedCount !== 0 && user.matchedCount !== 0) {
    setDevLog(filename, level.MARK, `User Updated Successfully with id: ${req.query._id}`);
      return res.status(200).send({
        message: `User Updated Successfully with id: ${req.query._id}`,
        data: user
      });
    } else if (user.matchedCount !== 0 && user.modifiedCount === 0) {
    setDevLog(filename, level.ERROR, `Unable to update User with id: ${req.query._id} `);
      return res.status(409).send({
        message: `Unable to update User with id: ${req.query._id}`,
        data: user
      });
    } else if (user.matchedCount === 0) {
    setDevLog(filename, level.ERROR, `No User found with id: ${req.query._id}`);
      return res.status(404).send({
        message: `No User found with id: ${req.query._id}`,
        data: user
      });
    } else {
    setDevLog(filename, level.WARN, `Error occured when updating user with id: ${req.query._id}`);
      return res.status(404).send({
        message: `Error occured when updating user with id: ${req.query._id}`,
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

//Delete or remove a User
export async function deleteUserHandler(req: Request<any, any, any, UserIDInput["query"]>, res: Response) {
  try {
    const user = await deleteUser(req.query._id);
    if (user.deletedCount !== 0) {
    setDevLog(filename, level.MARK, `User with id: ${req.query._id} has deleted Successfully.`);
    return res.status(200).send({
        message: `User with id: ${req.query._id} has deleted Successfully.`,
        data: user
      });
      // return res.status(200).send(user);
      // return res.status(200).send(omit(user, "password"));
    } else {
    setDevLog(filename, level.ERROR, `No User found with id: ${req.query._id}`);
      return res.status(400).send({
        message: `No User found with id: ${req.query._id}`,
        data: user
      });
    }
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at deleteUserHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}