// src/service/user.service.ts

import { omit } from "lodash";
import { DocumentDefinition} from "mongoose";
import UserModel, { UserDocument } from "../model/user.model";

import { Request } from "express";

// Create a User
export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | "comparePassword">>) {
  try {
    const createdUser = await UserModel.create(input);
    return omit(createdUser.toJSON(), "password")
  } catch (error: any) {
    throw new Error(error);
  }
}

//Get All User
export async function getAllUser() {
  try {
    return await UserModel.find().select(["-password", "-__v"]);
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get User by Id
export async function getUserbyId(_id: string) {
  try {
    return await UserModel.findById(_id).select(["-password", "-__v"]);
  } catch (error: any) {
    throw new Error(error);
  }
}

//Update an User's Data
export async function updateUser(_id: string, input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | "comparePassword">>) {
  try {
    return await UserModel.updateOne({_id: _id}, input);
  } catch (error: any) {
    throw new Error(error);
  }
}

//Delete or remove a User
export async function deleteUser(_id: string) {
  try {
    return await UserModel.deleteOne({_id:_id});
  } catch (error: any) {
    throw new Error(error);
  }
}


// Validate Password for a User to Creat a login Session
export async function validatePassword({email, password}:{email:string, password: string}) {
  try {
    const userDetails = UserModel.findOne({email});

    if(!userDetails) return false;

    const isvalid = await userDetails.comparePassword(password);

    if(!isvalid) return false;

    return omit(userDetails.toJSON(), "password")

  } catch (error: any) {
    throw new Error(error);
  }
}
