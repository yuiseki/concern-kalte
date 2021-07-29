/// <reference types="@emotion/react/types/css-prop" />
import React from 'react';
import 'twin.macro';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { Layout } from '~/components/Layout';

export const Page: React.VFC = () => {
  return (
    <Layout>
      <p>
        <Typography variant='h6'>お悩み解決カルテへようこそ！</Typography>
      </p>
      <p>
        <Typography variant='h6'>
          ユーザー登録しなくても
          <b>
            <Link href='/search'>お助け制度検索</Link>
          </b>
          を使うことができます。
        </Typography>
      </p>
      <p>
        <Typography variant='h6'>
          <b>
            <Link href='/auth/signup'>ユーザー登録</Link>
          </b>
          または
          <b>
            <Link href='/auth/signin'>ログイン</Link>
          </b>
          することで、お助け制度のレーティング、お悩み解決レシピの投稿ができます（開発中）。
        </Typography>
      </p>
    </Layout>
  );
};

export default Page;
