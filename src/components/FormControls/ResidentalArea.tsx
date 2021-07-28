import React, { useCallback } from 'react';
import useLocalStorageValue from '~/hooks/useLocalStorage';
import { openReverseGeocoder } from '@geolonia/open-reverse-geocoder';
import { Button, FormControl, TextField } from '@material-ui/core';

export const ResidentialAreaRGeoFormControl: React.VFC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useLocalStorageValue('area-state');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [city, setCity] = useLocalStorageValue('area-city');

  const getCurrentPosition = useCallback(() => {
    const success = async (position) => {
      const coords = position.coords;
      const result = await openReverseGeocoder([
        coords.longitude,
        coords.latitude,
      ]);
      // @ts-ignore
      setState(result.prefecture);
      // @ts-ignore
      setCity(result.city);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, [setState, setCity]);

  return (
    <FormControl variant='outlined'>
      <Button
        variant='contained'
        color='secondary'
        onClick={getCurrentPosition}
      >
        居住地を取得
      </Button>
    </FormControl>
  );
};

export const ResidentialAreaStateFormControl: React.VFC = () => {
  const name = 'area-state';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <TextField
        type='text'
        id={name}
        name={name}
        label='都道府県'
        variant='outlined'
        placeholder='東京都'
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      />
    </FormControl>
  );
};

export const ResidentialAreaCityFormControl: React.VFC = () => {
  const name = 'area-city';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <TextField
        type='text'
        id={name}
        name={name}
        label='市区町村'
        variant='outlined'
        placeholder='台東区'
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      />
    </FormControl>
  );
};
