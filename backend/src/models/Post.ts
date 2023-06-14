import { Schema, Types, model } from "mongoose";

interface IPost {
  user: Types.ObjectId;
  title: string;
  body: string;
  tags: string[];
  viewsCount: number;
  imageUrl?: string;
}

const PostSchema = new Schema<IPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Array,
        default: [],
      },
    ],
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default model("Post", PostSchema);
