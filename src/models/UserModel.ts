import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const HASH_ROUNDS = 10;

interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IUserModel extends IUser, mongoose.Document {}

const schema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

schema.pre('save', async function (next) {
  const user = this as IUserModel;
  // passwordが変更されていなかったらなにもしない
  if (!this.isModified('password')) next();
  // passwordが変更されていたらbcryptで暗号化する
  try {
    const salt = await bcrypt.genSalt(HASH_ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (e) {
    return next(e);
  }
});

schema.path('email').validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({
    email: value,
  });
  return !emailCount;
}, 'Email already exists');

export const UserModel =
  mongoose.models.UserModel || mongoose.model<IUserModel>('User', schema);
