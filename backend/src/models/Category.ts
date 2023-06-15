import { Schema, model } from "mongoose";
import { default as slugify } from "slugify";

import { ICategory } from "../types/category";

const CategorySchema = new Schema<ICategory>(
  {
    slug: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

export default model<ICategory>("Category", CategorySchema);
