import mongoose from 'mongoose';

interface ITeam {
  name?: string;
  users?: []
}

export interface ITeamModel extends ITeam, mongoose.Document {}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    users: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'UserModel' }]
  },
  { timestamps: true }
);

export const TeamModel =
  mongoose.models.TeamModel || mongoose.model<ITeamModel>('TeamModel', schema);
