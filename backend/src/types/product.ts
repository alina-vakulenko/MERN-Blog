import { Types, Document } from "mongoose";

export interface IProductCreate {
  category: Types.ObjectId;
  title: string;
  price: number;
  description?: string;
  images?: string[];
}

export interface IProduct extends IProductCreate, Document {
  slug: string;
}
