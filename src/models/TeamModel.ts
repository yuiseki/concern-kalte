import mongoose from 'mongoose';

interface ITeam {
  name: string;
}

export interface ITeamModel extends ITeam, mongoose.Document {}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const TeamModel =
  mongoose.models.TeamModel || mongoose.model<ITeamModel>('TeamModel', schema);
