import mongoose from 'mongoose';

interface IUser {
  name?: string;
}

export interface IUserModel extends IUser, mongoose.Document {}

const schema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.UserModel || mongoose.model<IUserModel>('User', schema);
