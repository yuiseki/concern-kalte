import { getSession } from 'next-auth/client';
import { dbConnect } from '~/lib/dbConnect';
import { RecipeModel } from '~/models/RecipeModel';
import { UserModel } from '~/models/UserModel';

export default async (req, res) => {
  const session = await getSession({ req });
  let user = null;
  await dbConnect();

  if (req.method !== 'GET') {
    if (!session) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }

    user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
  }

  switch (req.method) {
    case 'GET': {
      const recipes = await RecipeModel.find({}, null, {
        sort: { createdAt: -1 },
      }).populate('user', 'name');
      res.status(200).json(recipes);
      break;
    }
    case 'POST': {
      const recipe = new RecipeModel({
        title: req.body.title,
        body: req.body.body,
        user: user,
      });
      await recipe.save();
      res.status(200).json(recipe);
      break;
    }
    default:
      res.status(405);
      break;
  }

  res.end();
};
