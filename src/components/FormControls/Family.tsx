import React from 'react';
import 'twin.macro';
import useLocalStorageValue from '~/hooks/useLocalStorage';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

export const NotMarriedFormControl: React.VFC = () => {
  const name = 'not-married';
  const [value, setValue] = useLocalStorageValue(name, 'false');
  return (
    <FormControl variant='outlined'>
      <FormControlLabel
        label='独身'
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

export const MarriageStatusFormControl: React.VFC = () => {
  const name = 'marriage-status';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <InputLabel id='input-label-house-type'>婚姻状況</InputLabel>
      <Select
        labelId='input-label-family-type'
        label='婚姻状況'
        id={name}
        name={name}
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      >
        <MenuItem value='null'>未回答</MenuItem>
        <MenuItem value='not-married'>独身（結婚したことがない）</MenuItem>
        <MenuItem value='common-low-marriage'>事実婚</MenuItem>
        <MenuItem value='consider-marriage'>結婚を検討している</MenuItem>
        <MenuItem value='married'>結婚している</MenuItem>
        <MenuItem value='separated'>別居している</MenuItem>
        <MenuItem value='consider-divorce'>離婚を検討している</MenuItem>
        <MenuItem value='divorce-mediation'>離婚調停中</MenuItem>
        <MenuItem value='divorced'>離婚した</MenuItem>
        <MenuItem value='other'>その他</MenuItem>
      </Select>
    </FormControl>
  );
};
