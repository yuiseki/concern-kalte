import React, { useState, useEffect } from 'react';
import useLocalStorageValue from '~/hooks/useLocalStorage';
import { Box, FormControl, Slider, Typography } from '@material-ui/core';

export const PersonalYearlyIncomeControl: React.VFC = () => {
  const name = 'personal-yearly-income';
  const [value, setValue] = useLocalStorageValue(name, '0');

  // @ts-ignore
  const [defaultValue, setDefaultValue] = useState<string>(value);

  const valueLabelFormat = (value) => {
    if (value === null) {
      value = 0;
    }
    return `${value} 万円`;
  };

  useEffect(() => {
    // @ts-ignore
    setDefaultValue(parseInt(value));
  }, [value]);

  return (
    <FormControl variant='outlined'>
      <Typography id='input-slider' gutterBottom>
        個人年収：{valueLabelFormat(value)}
      </Typography>
      <Box sx={{ width: 200 }}>
        <Slider
          step={50}
          marks
          min={0}
          max={1000}
          value={parseInt(defaultValue)}
          onChange={(e, val) => {
            // @ts-ignore
            setValue(val);
          }}
        />
      </Box>
    </FormControl>
  );
};
