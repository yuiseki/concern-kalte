import React, { useState } from 'react';
import { getCsrfToken, useSession } from 'next-auth/client';
import { Grid, Button, TextField } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { useEffect } from 'react';
import { Layout } from '~/components/Layout';

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [session] = useSession();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMatched, setPasswordMatched] = useState(false);

  if (session) return <>ログイン済みです</>;

  useEffect(() => {
    if (password.length > 0 && passwordConfirm.length > 0) {
      setPasswordMatched(password === passwordConfirm);
    }
  }, [password, passwordConfirm]);

  return (
    <Layout>
      <form method='post' action='/api/auth/callback/credentials'>
        <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
        <input name='callbackUrl' type='hidden' defaultValue='/main' />
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
                  id='password-confirm'
                  required
                  label='パスワード（確認）'
                  variant='outlined'
                  placeholder='********'
                  error={!passwordMatched}
                  helperText={
                    !passwordMatched && 'パスワードが一致していません'
                  }
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={!passwordMatched}
            >
              ユーザー登録
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
