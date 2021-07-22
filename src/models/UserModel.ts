import mongoose from 'mongoose';

interface IUser {
  name?: string;
  email: string;
}

export interface IUserModel extends IUser, mongoose.Document {}

const schema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, lowercase: true, required: true, unique: true },
  },
  { timestamps: true }
);

schema.path('email').validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({
    email: value,
  });
  return !emailCount;
}, 'Email already exists');

export const UserModel =
  mongoose.models.UserModel || mongoose.model<IUserModel>('User', schema);
