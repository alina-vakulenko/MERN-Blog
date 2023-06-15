import { FilterQuery } from "mongoose";

import UserModel from "../models/User";
import { hashPassword } from "../utils/passwordHash";
import { IUser, IUserCreate, IUserUpdate } from "../types/user";

export const createUser = async (input: IUserCreate) => {
  const { password, ...otherFields } = input;
  const hashedPassword = await hashPassword(password);

  return await UserModel.create({ ...otherFields, password: hashedPassword });
};

export const findUserById = async (id: string) => {
  return await UserModel.findById(id).lean();
};

export const findUserByField = async (query: FilterQuery<IUser>) => {
  return await UserModel.findOne(query).lean();
};

export const getAllUsers = async () => {
  return await UserModel.find().lean();
};

export const deleteUserByField = async (query: FilterQuery<IUser>) => {
  return await UserModel.deleteOne(query);
};

export const updateUserByField = async (
  query: FilterQuery<IUser>,
  data: IUserUpdate
) => {
  return await UserModel.updateOne(query, data);
};
