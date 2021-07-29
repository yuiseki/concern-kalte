import React from 'react';
import 'twin.macro';
import useLocalStorageValue from '~/hooks/useLocalStorage';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export const JobsFormControl: React.VFC = () => {
  const name = 'jobs';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <InputLabel id='input-label-jobs'>職業</InputLabel>
      <Select
        labelId='input-label-jobs'
        label='職業'
        id={name}
        name={name}
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      >
        <MenuItem value='null'>未回答</MenuItem>
        <MenuItem value='unemployment'>失業・求職中</MenuItem>
        <MenuItem value='stay-at-home'>専業主婦・専業主夫</MenuItem>
        <MenuItem value='non-regular-employee'>
          非正規雇用（アルバイト）
        </MenuItem>
        <MenuItem value='non-regular-employee'>
          非正規雇用（パートタイマー）
        </MenuItem>
        <MenuItem value='non-regular-employee'>非正規雇用（契約社員）</MenuItem>
        <MenuItem value='non-regular-employee'>非正規雇用（派遣社員）</MenuItem>
        <MenuItem value='non-regular-employee'>非正規雇用（臨時職員）</MenuItem>
        <MenuItem value='full-time-employee'>正社員</MenuItem>
        <MenuItem value='civil-servant'>公務員</MenuItem>
        <MenuItem value='self-employed'>自営業</MenuItem>
        <MenuItem value='self-employed'>個人事業主</MenuItem>
        <MenuItem value='self-employed'>フリーランス</MenuItem>
        <MenuItem value='president'>社長</MenuItem>
        <MenuItem value='board-member'>会社役員</MenuItem>
        <MenuItem value='other'>その他</MenuItem>
      </Select>
    </FormControl>
  );
};
