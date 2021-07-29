import React from 'react';
import 'twin.macro';
import useLocalStorageValue from '~/hooks/useLocalStorage';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

export const ParentingFormControl: React.VFC = () => {
  const name = 'parenting';
  const [value, setValue] = useLocalStorageValue(name, 'false');
  return (
    <>
      <ListItem>
        <FormControl variant='outlined'>
          <FormControlLabel
            label='子育て中'
            control={
              <Checkbox
                name={name}
                checked={value === 'true'}
                onChange={(e) => {
                  // @ts-ignore
                  setValue(String(e.target.checked));
                }}
              />
            }
          />
        </FormControl>
      </ListItem>
      {value === 'true' && (
        <>
          <ListItem>
            <ChildNumberFormControl />
          </ListItem>
          <ListItem>
            <ChildBirthYearFormControl />
          </ListItem>
          <ListItem>
            <ChildRearingAllowanceFormControl />
          </ListItem>
          <ListItem>
            <ChildSupportFormControl />
          </ListItem>
        </>
      )}
    </>
  );
};

export const ChildNumberFormControl: React.VFC = () => {
  const name = 'child-number';
  const [value, setValue] = useLocalStorageValue(name, '1');

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel id='input-label-child-number'>子どもの数</InputLabel>
      <Select
        labelId='input-label-child-number'
        label='子どもの数'
        id={name}
        name={name}
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      >
        {[...Array(10).keys()].map((num) => {
          return (
            <MenuItem key={num + 1} value={num + 1}>
              {num + 1}人
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export const ChildBirthYearFormControl: React.VFC = () => {
  const name = 'child-birth-year';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel id='input-label-child-birth-year'>
        一番下の子の生まれた年
      </InputLabel>
      <Select
        labelId='input-label-child-birth-year'
        label='一番下の子の生まれた年'
        id={name}
        name={name}
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      >
        <MenuItem value='null'>未回答</MenuItem>
        {[...Array(100).keys()]
          .map((i) => 2022 - i)
          .map((year) => {
            return (
              <MenuItem key={year} value={year}>
                {year}年
              </MenuItem>
            );
          })}
      </Select>
      {value !== 'null' && (
        <Typography id='age' gutterBottom>
          一番下の子の年齢：
          {
            // @ts-ignore
            new Date().getFullYear() - parseInt(value) + '歳'
          }
        </Typography>
      )}
    </FormControl>
  );
};

export const ChildRearingAllowanceFormControl: React.VFC = () => {
  const name = 'child-rearing-allowance';
  const [value, setValue] = useLocalStorageValue(name, 'false');

  return (
    <FormControl variant='outlined' fullWidth>
      <FormControlLabel
        label='児童扶養手当を受給している'
        control={
          <Checkbox
            name={name}
            checked={value === 'true'}
            onChange={(e) => {
              // @ts-ignore
              setValue(String(e.target.checked));
            }}
          />
        }
      />
    </FormControl>
  );
};

export const ChildSupportFormControl: React.VFC = () => {
  const name = 'child-support';
  const [value, setValue] = useLocalStorageValue(name, 'false');

  return (
    <FormControl variant='outlined' fullWidth>
      <FormControlLabel
        label='養育費を受け取っている'
        control={
          <Checkbox
            name={name}
            checked={value === 'true'}
            onChange={(e) => {
              // @ts-ignore
              setValue(String(e.target.checked));
            }}
          />
        }
      />
    </FormControl>
  );
};
