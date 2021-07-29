import React from 'react';
import 'twin.macro';
import useLocalStorageValue from '~/hooks/useLocalStorage';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  List,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SolutionTypeGovNationControl: React.VFC = () => {
  const name = 'solution-type-gov-nation';
  const [value, setValue] = useLocalStorageValue(name, 'true');

  return (
    <FormControl variant='outlined' fullWidth>
      <FormControlLabel
        label='国'
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

const SolutionTypeLocalGovStateControl: React.VFC = () => {
  const name = 'solution-type-gov-state';
  const [value, setValue] = useLocalStorageValue(name, 'true');

  return (
    <FormControl variant='outlined' fullWidth>
      <FormControlLabel
        label='都道府県'
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

const SolutionTypeLocalGovCityControl: React.VFC = () => {
  const name = 'solution-type-gov-city';
  const [value, setValue] = useLocalStorageValue(name, 'true');

  return (
    <FormControl variant='outlined' fullWidth>
      <FormControlLabel
        label='市区町村'
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

const SolutionTypeNPOControl: React.VFC = () => {
  const name = 'solution-type-npo';
  const [value, setValue] = useLocalStorageValue(name, 'true');

  return (
    <FormControl variant='outlined' fullWidth>
      <FormControlLabel
        label='NPO'
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

export const SolutionTypeControl: React.VFC = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>制度種別を選択</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <SolutionTypeGovNationControl />
            <SolutionTypeLocalGovStateControl />
            <SolutionTypeLocalGovCityControl />
            <SolutionTypeNPOControl />
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
