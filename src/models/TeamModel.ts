import mongoose from 'mongoose';
import { ISolutionModel } from './SolutionModel';
import { IUserModel } from './UserModel';

interface ITeam {
  name: string;
  users?: IUserModel[];
  solutions?: ISolutionModel[];
}

export interface ITeamModel extends ITeam, mongoose.Document {}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    users: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'UserModel' }],
    solutions: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'SolutionModel' }],
  },
  { timestamps: true }
);

export const TeamModel =
  mongoose.models.TeamModel || mongoose.model<ITeamModel>('TeamModel', schema);
