import mongoose from 'mongoose';
import { IUserModel } from './UserModel';

interface IRecipe {
  title: string;
  body: string;
  user: IUserModel;
  createdAt: string;
  updatedAt: string;
}

export interface IRecipeModel extends IRecipe, mongoose.Document {}

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'UserModel',
      default: null,
    },
  },
  { timestamps: true }
);

export const RecipeModel =
  mongoose.models.RecipeModel ||
  mongoose.model<IRecipeModel>('RecipeModel', schema);
