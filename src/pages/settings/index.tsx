/// <reference types="@emotion/react/types/css-prop" />
import React, { useCallback } from 'react';
import { getSession } from 'next-auth/client';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import useSWR from 'swr';
import 'twin.macro';

export const Page: React.VFC = () => {
  const { data: me } = useSWR('/api/users/me');

  const years = [...Array(100).keys()].map((i) => 2022 - i);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    const res = await fetch('/api/users/me', {
      body: JSON.stringify({
        name: e.target.name.value,
        birthYear: e.target.birthYear.value,
        gender: e.target.gender.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result = await res.json();
    console.info(result);
    window.location.reload();
  }, []);

  return (
    <>
      <h3 tw='text-3xl font-bold'>ユーザー設定</h3>
      {me && (
        <form tw='my-4' onSubmit={onSubmit}>
          <Grid
            container
            spacing={4}
            alignItems='flex-start'
            direction='column'
          >
            <Grid item>
              <FormControl>
                <InputLabel htmlFor='email'>メールアドレス</InputLabel>
                <Input
                  required
                  type='email'
                  id='email'
                  name='email'
                  disabled
                  defaultValue={me.email}
                />
                <FormHelperText>メールアドレスは変更できません</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor='name'>名前</InputLabel>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  defaultValue={me.name}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor='birthYear'>生年</InputLabel>
                <Select
                  id='birthYear'
                  name='birthYear'
                  defaultValue={String(me.birthYear)}
                >
                  <MenuItem value='null'>未回答</MenuItem>
                  {years.map((year) => {
                    return (
                      <MenuItem key={year} value={year}>
                        {year}年
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor='gender'>性別</InputLabel>
                <Select
                  id='gender'
                  name='gender'
                  defaultValue={String(me.gender)}
                >
                  <MenuItem value='null'>未回答</MenuItem>
                  <MenuItem value='male'>男性</MenuItem>
                  <MenuItem value='female'>女性</MenuItem>
                  <MenuItem value='other'>その他</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button type='submit' variant='contained' color='primary'>
                保存
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
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
