import React from 'react';
import 'twin.macro';
import useLocalStorageValue from '~/hooks/useLocalStorage';
import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';

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
