import { Schema, model } from "mongoose";
import { IProduct } from "../types/product";

const ProductSchema = new Schema<IProduct>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    images: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>("Product", ProductSchema);
