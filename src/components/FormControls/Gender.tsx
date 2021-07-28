import React from 'react';
import useLocalStorageValue from "~/hooks/useLocalStorage";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export const GenderFormControl: React.VFC = () => {
  const name = 'gender';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <InputLabel id='input-label-gender'>性別</InputLabel>
      <Select
        labelId='input-label-gender'
        label='性別'
        id={name}
        name={name}
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      >
        <MenuItem value='null'>未回答</MenuItem>
        <MenuItem value='male'>男性</MenuItem>
        <MenuItem value='female'>女性</MenuItem>
        <MenuItem value='other'>その他</MenuItem>
      </Select>
    </FormControl>
  );
};
