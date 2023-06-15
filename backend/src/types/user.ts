import { Document, ObjectId } from "mongoose";

type RoleKeys = "Admin" | "Editor" | "User";
export type Roles = number[];

export type IUserRoles = {
  [key in RoleKeys]: number;
};

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface IUser extends IUserCreate, Document {
  roles: IUserRoles;
}

export interface IUserOutput extends Omit<IUser, "password" | "roles"> {
  roles: number[];
}

export interface IUserAuthenticated extends Omit<IUser, "roles"> {
  userId: ObjectId;
  roles: number[];
}

export type IUserLogin = Pick<IUserCreate, "email" | "password">;
export type IUserUpdate = Omit<IUserCreate, "password" | "email">;
export type IUserResetPassword = Pick<IUserCreate, "email">;
