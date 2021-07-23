/// <reference types="@emotion/react/types/css-prop" />
import React from 'react';
import { useSession } from 'next-auth/client';
import { Typography } from '@material-ui/core';
import useSWR from 'swr';
import 'twin.macro';
import Link from 'next/link';

export const Page: React.VFC = () => {
  const [session, loading] = useSession();
  const { data: me } = useSWR('/api/users/me');

  return (
    <>
      {loading && <h3 tw='text-3xl font-bold'>ロード中…</h3>}
      {!loading && session && me && (
        <>
          <h3 tw='text-3xl font-bold'>
            {me.name ? me.name : '名無し'}({me.email}) さん、ようこそ
          </h3>
          {!me.name && (
            <p>
              <Link href='/settings'>ユーザー設定</Link>で名前を設定してください
            </p>
          )}
        </>
      )}
      {!loading && !session && (
        <Typography variant='h6'>
          <Link href='/auth/signup'>ユーザー登録</Link>
          または
          <Link href='/auth/signin'>ログイン</Link>
          してください
        </Typography>
      )}
    </>
  );
};

export default Page;
