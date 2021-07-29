import React, { useCallback } from 'react';
import useLocalStorageValue from '~/hooks/useLocalStorage';
import { openReverseGeocoder } from '@geolonia/open-reverse-geocoder';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

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
  const [value, setValue] = useLocalStorageValue(name, '');

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
  const [value, setValue] = useLocalStorageValue(name, '');

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

export const ResidentialHouseTypeFormControl: React.VFC = () => {
  const name = 'house-type';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <InputLabel id='input-label-house-type'>居住形態</InputLabel>
      <Select
        labelId='input-label-house-type'
        label='住居'
        id={name}
        name={name}
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      >
        <MenuItem value='null'>未回答</MenuItem>
        <MenuItem value='consider-moving'>引っ越しを検討中</MenuItem>
        <MenuItem value='rent-house'>賃貸</MenuItem>
        <MenuItem value='public-house'>公営住宅</MenuItem>
        <MenuItem value='owned-house'>持ち家</MenuItem>
        <MenuItem value='parent-house'>実家</MenuItem>
        <MenuItem value='nothing'>住む場所がない</MenuItem>
        <MenuItem value='net-cafe'>ネットカフェ</MenuItem>
        <MenuItem value='homeless-shelter'>緊急一時宿泊施設</MenuItem>
        <MenuItem value='dv-shelter'>DVシェルター</MenuItem>
        <MenuItem value='other'>その他</MenuItem>
      </Select>
    </FormControl>
  );
};
