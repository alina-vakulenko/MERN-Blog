import { Schema, Document, model, ObjectId } from "mongoose";
import { hashPassword } from "../utils/passwordHash";
import { IUserRoles } from "../config/roles";

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface IUser extends IUserCreate, Document {
  roles: IUserRoles;
}

const UserSchema: Schema = new Schema(
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
      select: false,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

// UserSchema.set("toJSON", {
//   transform: function (doc, ret, options) {
//     delete ret.password;
//     return ret;
//   },
// });

export type IUserLogin = Pick<IUserCreate, "email" | "password">;
export interface IUserAuthenticated extends Omit<IUser, "roles"> {
  userId: ObjectId;
  roles: number[];
}
export type IUserUpdate = Omit<IUserCreate, "password" | "email">;
export type IUserResetPassword = Pick<IUserCreate, "email">;

export default model<IUser>("User", UserSchema);
