import { FilterQuery } from "mongoose";

import UserModel, { IUser, IUserCreate, IUserUpdate } from "../models/User";
import { hashPassword } from "../utils/passwordHash";

export const createUser = async (input: IUserCreate) => {
  const { password, email, name } = input;
  const hashedPassword = await hashPassword(password);

  return await UserModel.create({ email, name, password: hashedPassword });
};

export const findUserById = async (id: string) => {
  return await UserModel.findById(id).lean();
};

export const findUserByField = async (query: FilterQuery<IUser>) => {
  return await UserModel.findOne(query).lean();
};

export const getAllUsers = async () => {
  return await UserModel.find();
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
