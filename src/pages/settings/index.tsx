/// <reference types="@emotion/react/types/css-prop" />
import React, { useCallback } from 'react';
import { getSession } from 'next-auth/client';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import useSWR from 'swr';
import 'twin.macro';
import { Layout } from '~/components/Layout';

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
        personalYearlyIncome: e.target.personalYearlyIncome.value,
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
    <Layout>
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
              <TextField
                defaultValue={me.email}
                type='email'
                id='email'
                name='email'
                label='メールアドレス'
                variant='outlined'
                disabled
                helperText='メールアドレスは変更できません'
              />
            </Grid>
            <Grid item>
              <TextField
                defaultValue={me.name}
                type='text'
                id='name'
                name='name'
                label='名前'
                variant='outlined'
              />
            </Grid>
            <Grid item>
              <FormControl variant='outlined'>
                <InputLabel id='input-label-birth-year'>生まれた年</InputLabel>
                <Select
                  labelId='input-label-birth-year'
                  label='生まれた年'
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
              <FormControl variant='outlined'>
                <InputLabel id='input-label-gender'>性別</InputLabel>
                <Select
                  labelId='input-label-gender'
                  label='性別'
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
              <FormControl variant='outlined'>
                <InputLabel id='input-label-personalYearlyIncome'>
                  個人年収
                </InputLabel>
                <Select
                  labelId='input-label-personalYearlyIncome'
                  label='個人年収'
                  id='personalYearlyIncome'
                  name='personalYearlyIncome'
                  defaultValue={String(me.personalYearlyIncome)}
                >
                  <MenuItem value='null'>未回答</MenuItem>
                  <MenuItem value='0-100'>0-100</MenuItem>
                  <MenuItem value='100-200'>100-200</MenuItem>
                  <MenuItem value='200-300'>200-300</MenuItem>
                  <MenuItem value='300-400'>300-400</MenuItem>
                  <MenuItem value='400-500'>400-500</MenuItem>
                  <MenuItem value='500-600'>500-600</MenuItem>
                  <MenuItem value='600-700'>600-700</MenuItem>
                  <MenuItem value='700-800'>700-800</MenuItem>
                  <MenuItem value='800-900'>800-900</MenuItem>
                  <MenuItem value='900-1000'>900-1000</MenuItem>
                  <MenuItem value='1000-'>1000-</MenuItem>
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
