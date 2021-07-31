/// <reference types="@emotion/react/types/css-prop" />
import React, { useCallback } from 'react';
import { getSession } from 'next-auth/client';
import { Button, Grid, TextField } from '@material-ui/core';
import useSWR from 'swr';
import 'twin.macro';
import { Layout } from '~/components/Layout';
import { useRouter } from 'next/dist/client/router';

export const Page: React.VFC = () => {
  const router = useRouter();
  const { data: me } = useSWR('/api/users/me');

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    const res = await fetch('/api/recipes', {
      body: JSON.stringify({
        title: e.target.title.value,
        body: e.target.body.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result = await res.json();
    console.info(result);
    router.push('/recipes');
  }, []);

  return (
    <Layout>
      <h3 tw='text-3xl font-bold'>お悩み解決レシピ</h3>
      {me && (
        <form tw='my-4 flex-grow' onSubmit={onSubmit}>
          <Grid container spacing={4} direction='column'>
            <Grid item xs={12}>
              <TextField
                defaultValue={me.name}
                type='text'
                id='name'
                label='投稿者'
                variant='outlined'
                disabled
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='text'
                id='title'
                name='title'
                label='タイトル'
                variant='outlined'
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='text'
                id='body'
                name='body'
                label='本文'
                variant='outlined'
                required
                fullWidth
                multiline
                rows={10}
              />
            </Grid>
            <Grid item>
              <Button type='submit' variant='contained' color='primary'>
                投稿
              </Button>
            </Grid>
          </Grid>
        </form>
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
