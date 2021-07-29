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
        <ListItem>
          <ChildBirthYearFormControl />
        </ListItem>
      )}
    </>
  );
};

export const ChildBirthYearFormControl: React.VFC = () => {
  const name = 'child-birth-year';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel id='input-label-child-birth-year'>
        子どもの生まれた年
      </InputLabel>
      <Select
        labelId='input-label-child-birth-year'
        label='子どもの生まれた年'
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
          子どもの年齢：
          {
            // @ts-ignore
            new Date().getFullYear() - parseInt(value) + '歳'
          }
        </Typography>
      )}
    </FormControl>
  );
};
