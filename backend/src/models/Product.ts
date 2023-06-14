import { Schema, Types, model } from "mongoose";

interface IProduct {
  category: Types.ObjectId;
  title: string;
  price: number;
  description?: string;
  images?: string[];
}

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

export default model("Product", ProductSchema);
