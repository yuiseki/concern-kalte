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

const SolutionTypeGovNationFormControl: React.VFC = () => {
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

const SolutionTypeLocalGovStateFormControl: React.VFC = () => {
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

const SolutionTypeLocalGovCityFormControl: React.VFC = () => {
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

const SolutionTypeNPOFormControl: React.VFC = () => {
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

export const SolutionTypeFormControl: React.VFC = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>制度種別を選択</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <SolutionTypeGovNationFormControl />
            <SolutionTypeLocalGovStateFormControl />
            <SolutionTypeLocalGovCityFormControl />
            <SolutionTypeNPOFormControl />
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
