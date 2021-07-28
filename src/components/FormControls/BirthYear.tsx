import React from 'react';
import useLocalStorageValue from '~/hooks/useLocalStorage';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export const BirthYearFormControl: React.VFC = () => {
  const name = 'birth-year';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel id='input-label-birth-year'>あなたの生まれた年</InputLabel>
      <Select
        labelId='input-label-birth-year'
        label='あなたの生まれた年'
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
          あなたの年齢：
          {
            // @ts-ignore
            new Date().getFullYear() - parseInt(value) + '歳'
          }
        </Typography>
      )}
    </FormControl>
  );
};
