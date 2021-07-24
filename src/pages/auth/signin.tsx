import React from 'react';
import { getCsrfToken, useSession } from 'next-auth/client';
import { Grid, Button, TextField } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [session] = useSession();

  if (session) return <>ログイン済みです</>;

  return (
    <form method='post' action='/api/auth/callback/credentials'>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <input name='callbackUrl' type='hidden' defaultValue='/' />
      <Grid container spacing={4} alignItems='center' direction='column'>
        <Grid item>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <EmailIcon />
            </Grid>
            <Grid item>
              <TextField
                type='email'
                id='email'
                name='email'
                required
                label='メールアドレス'
                variant='outlined'
                placeholder='example@example.com'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <LockIcon />
            </Grid>
            <Grid item>
              <TextField
                type='password'
                id='password'
                name='password'
                required
                label='パスワード'
                variant='outlined'
                placeholder='********'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button type='submit' variant='contained' color='primary'>
            ログイン
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
