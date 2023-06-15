import { Schema, model } from "mongoose";

import { IUser } from "../types/user";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      User: {
        type: Number,
        default: 1111,
      },
      Editor: Number,
      Admin: Number,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", UserSchema);
