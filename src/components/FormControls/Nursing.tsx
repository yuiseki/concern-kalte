import React from 'react';
import 'twin.macro';
import useLocalStorageValue from '~/hooks/useLocalStorage';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  ListItem,
} from '@material-ui/core';

export const NursingFormControl: React.VFC = () => {
  const name = 'parenting';
  const [value, setValue] = useLocalStorageValue(name, 'false');
  return (
    <>
      <ListItem>
        <FormControl variant='outlined'>
          <FormControlLabel
            label='介護中'
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
    </>
  );
};
