import React from 'react';
import 'twin.macro';
import { Divider, ListItem, Typography } from '@material-ui/core';
import {
  ResidentialAreaCityFormControl,
  ResidentialAreaRGeoFormControl,
  ResidentialAreaStateFormControl,
  ResidentialHouseTypeFormControl,
} from '~/components/FormControls/Residential';
import { BirthYearFormControl } from '~/components/FormControls/BirthYear';
import { GenderFormControl } from '~/components/FormControls/Gender';
import { MarriageStatusFormControl } from '~/components/FormControls/Family';
import { ParentingFormControl } from '~/components/FormControls/Parenting';
import { JobsFormControl } from '~/components/FormControls/Jobs';
import {
  HouseholdYearlyIncomeFormControl,
  PersonalYearlyIncomeFormControl,
} from '~/components/FormControls/Income';
import { SolutionTypeFormControl } from './FormControls/SolutionType';
import { NursingFormControl } from './FormControls/Nursing';
import { HandicappedFormControl } from './FormControls/Handicapped';
import { LiveWithParentsFormControl } from './FormControls/LiveWithParents';

export const SearchListItems: React.VFC = () => {
  return (
    <>
      <Divider />
      <div tw='ml-4 my-2'>
        <Typography variant='h5' noWrap>
          制度絞り込み
        </Typography>
      </div>
      <Divider />
      <ListItem>
        <SolutionTypeFormControl />
      </ListItem>
      <Divider />
      <div tw='ml-4'>
        <Typography variant='h6' noWrap>
          居住地域
        </Typography>
      </div>
      <ListItem>
        <ResidentialAreaRGeoFormControl />
      </ListItem>
      <ListItem>
        <ResidentialAreaStateFormControl />
      </ListItem>
      <ListItem>
        <ResidentialAreaCityFormControl />
      </ListItem>
      <ListItem>
        <ResidentialHouseTypeFormControl />
      </ListItem>
      <Divider />
      <div tw='ml-4 my-2'>
        <Typography variant='h6' noWrap>
          個人属性
        </Typography>
      </div>
      <ListItem>
        <BirthYearFormControl />
      </ListItem>
      <ListItem>
        <GenderFormControl />
      </ListItem>
      <HandicappedFormControl />
      <Divider />
      <div tw='ml-4 my-2'>
        <Typography variant='h6' noWrap>
          職業と収入
        </Typography>
      </div>
      <ListItem>
        <JobsFormControl />
      </ListItem>
      <ListItem>
        <PersonalYearlyIncomeFormControl />
      </ListItem>
      <ListItem>
        <HouseholdYearlyIncomeFormControl />
      </ListItem>
      <Divider />
      <div tw='ml-4 my-2'>
        <Typography variant='h6' noWrap>
          家族構成
        </Typography>
      </div>
      <ListItem>
        <MarriageStatusFormControl />
      </ListItem>
      <LiveWithParentsFormControl />
      <ParentingFormControl />
      <NursingFormControl />
      <Divider />
    </>
  );
};
