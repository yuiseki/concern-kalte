import mongoose from 'mongoose';

interface ISolution {
  name: string;
}

export interface ISolutionModel extends ISolution, mongoose.Document {}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const SolutionModel =
  mongoose.models.SolutionModel ||
  mongoose.model<ISolutionModel>('SolutionModel', schema);
