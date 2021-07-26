/// <reference types="@emotion/react/types/css-prop" />
import React, { useCallback } from 'react';
import { getSession } from 'next-auth/client';
import {
  Button,
  Grid,
  //FormControl,
  //FormHelperText,
  //Input,
  //InputLabel,
} from '@material-ui/core';
import useSWR from 'swr';
import 'twin.macro';
import { Layout } from '~/components/Layout';

export const Page: React.VFC = () => {
  const { data: me } = useSWR('/api/users/me');
  //const { data: concerns } = useSWR('/api/concerns');

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    return;

    const res = await fetch('/api/concerns/me', {
      body: JSON.stringify({
        name: e.target.name.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result = await res.json();
    console.info(result);
  }, []);

  return (
    <Layout>
      {me && (
        <>
          <h3 tw='text-3xl font-bold'>
            {me.name ? me.name : '名無し'}({me.email}) さんの 生活お悩みカルテ
          </h3>
          <form tw='my-4' onSubmit={onSubmit}>
            <Grid
              container
              spacing={4}
              alignItems='flex-start'
              direction='column'
            >
              <Grid item>
                <h1>実装中…</h1>
              </Grid>
              <Grid item>
                <Button type='submit' variant='contained' color='primary'>
                  保存
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return { props: {} };
  }

  return {
    props: {
      session: session,
    },
  };
}

export default Page;
