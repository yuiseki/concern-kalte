/// <reference types="@emotion/react/types/css-prop" />
import React from 'react';
import { useSession } from 'next-auth/client';
import { Typography } from '@material-ui/core';
import useSWR from 'swr';
import 'twin.macro';

export const Page: React.VFC = () => {
  const [session, loading] = useSession();
  const { data: me } = useSWR('/api/users/me');

  return (
    <>
      {loading && <h3 tw='text-3xl font-bold'>ロード中…</h3>}
      {!loading && session && me && (
        <h3 tw='text-3xl font-bold'>
          {me.name ? me.name : '名無し'}({me.email}) さん、ようこそ
        </h3>
      )}
      {!loading && !session && (
        <Typography variant='h6'>
          ログインまたはユーザー登録してください
        </Typography>
      )}
    </>
  );
};

export default Page;
