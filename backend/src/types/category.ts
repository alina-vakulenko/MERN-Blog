import { ObjectId, Document } from "mongoose";

export interface ICategoryCreate {
  slug: string;
  name: string;
  imageUrl: string;
}

export interface ICategory extends ICategoryCreate, Document {}
