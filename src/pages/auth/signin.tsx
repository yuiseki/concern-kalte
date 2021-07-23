import React from 'react';
import { getCsrfToken, useSession } from 'next-auth/client';
import {
  Grid,
  Input,
  Button,
  FormControl,
  InputLabel,
} from '@material-ui/core';
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
              <FormControl>
                <InputLabel htmlFor='email'>メールアドレス</InputLabel>
                <Input
                  required
                  type='email'
                  id='email'
                  name='email'
                  placeholder='example@example.com'
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <LockIcon />
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor='password'>パスワード</InputLabel>
                <Input
                  required
                  type='password'
                  id='password'
                  name='password'
                  placeholder='********'
                />
              </FormControl>
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
