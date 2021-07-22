import { dbConnect } from '~/lib/dbConnect';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await dbConnect();
  res.status(200).json({ state: mongoose.connection.readyState });
}
