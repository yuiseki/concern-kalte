/// <reference types="@emotion/react/types/css-prop" />
import React from 'react';
import useSWR from 'swr';
import 'twin.macro';
import { Layout } from '~/components/Layout';
import { RecipeCard } from '~/components/RecipeCard';

const Page: React.VFC = () => {
  const { data: recipes } = useSWR('/api/recipes');

  return (
    <Layout>
      <h1 tw='text-2xl'>お悩み解決レシピ</h1>
      <div tw='my-4'>
        {recipes?.map((r) => {
          return <RecipeCard key={r._id} recipe={r} />;
        })}
      </div>
    </Layout>
  );
};

export default Page;
