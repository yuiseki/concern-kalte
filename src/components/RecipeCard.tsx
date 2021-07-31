/// <reference types="@emotion/react/types/css-prop" />
import React from 'react';
import 'twin.macro';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import { IRecipeModel } from '~/models/RecipeModel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Link from 'next/link';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const stringToShortString = (string) => {
  if (string.indexOf(' ') > 0) {
    return `${string.split(' ')[0][0]}${string.split(' ')[1][0]}`;
  } else {
    return string.slice(0, 2);
  }
};

export const RecipeCard: React.VFC<{ recipe: IRecipeModel }> = ({
  recipe,
}: {
  recipe: IRecipeModel;
}) => {
  return (
    <Card key={recipe._id} tw='my-5' elevation={2}>
      <CardHeader
        avatar={
          <Avatar
            aria-label='user'
            css={{
              backgroundColor: stringToColor(recipe.user.name) + ' !important',
            }}
          >
            {stringToShortString(recipe.user.name)}
          </Avatar>
        }
        action={
          <IconButton aria-label='edit'>
            <MoreVertIcon />
          </IconButton>
        }
        title={<Link href={'/recipes/' + recipe._id}>{recipe.title}</Link>}
        subheader={new Date(recipe.createdAt).toLocaleString()}
      />
      <CardContent>
        <p>{recipe.body}</p>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
