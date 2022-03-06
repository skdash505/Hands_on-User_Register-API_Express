// src/service/user.service.ts

import { Omit } from "lodash";
import { DocumentDefinition} from "mongoose";
import UserModel, { UserDocument } from "../model/user.model";

import { Request } from "express";

export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | "comparePassword">>) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getAllUser() {
  try {
    return await UserModel.find().select(["-password", "-__v"]);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserbyId(_id: string) {
  try {
    return await UserModel.findById(_id).select(["-password", "-__v"]);
  } catch (error: any) {
    throw new Error(error);
  }
}


export async function updateUser(_id: string, input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | "comparePassword">>) {
  try {
    return await UserModel.updateOne({_id: _id}, input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteUser(_id: string) {
  try {
    return await UserModel.deleteOne({_id:_id});
  } catch (error: any) {
    throw new Error(error);
  }
}