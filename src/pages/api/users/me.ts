import { getSession } from 'next-auth/client';
import { dbConnect } from '~/lib/dbConnect';
import { UserModel } from '~/models/UserModel';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
    return;
  }

  await dbConnect();
  const user = await UserModel.findOne({ email: session.user.email });
  if (!user) {
    res.status(404);
    res.end();
    return;
  }

  switch (req.method) {
    case 'GET':
      res.status(200).json(user);
      break;
    case 'POST':
      user.name = req.body.name;
      await UserModel.findOneAndUpdate({ _id: user._id }, user, {
        upsert: true,
      });
      res.status(200).json(user);
      break;
    default:
      break;
  }
  res.end();
};
