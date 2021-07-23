import React, { useState } from 'react';
import { getCsrfToken, useSession } from 'next-auth/client';
import {
  Grid,
  Input,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { useEffect } from 'react';

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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
                <InputLabel htmlFor='password-confirm'>
                  パスワード（確認）
                </InputLabel>
                <Input
                  required
                  type='password'
                  id='password-comfirm'
                  placeholder='********'
                  error={!passwordMatched}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                />
                {!passwordMatched && (
                  <FormHelperText error>
                    パスワードが一致していません
                  </FormHelperText>
                )}
              </FormControl>
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
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
