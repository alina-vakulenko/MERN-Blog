import { ObjectId } from "mongoose";
import { Roles } from "../types/user";

export interface IJwtPayload {
  userId: ObjectId;
  roles: Roles;
}

export type Token = string;
