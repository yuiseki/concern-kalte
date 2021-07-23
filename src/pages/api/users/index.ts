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
    res.status(401);
    res.end();
    return;
  }

  if (req.method === 'GET') {
    const users = await UserModel.find();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404);
    }
  }
  res.end();
};
